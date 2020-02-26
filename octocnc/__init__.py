from __future__ import absolute_import

import os
import flask

import octoprint.plugin
from octoprint.settings import settings
from octoprint.util import RepeatedTimer

from . import models, api, db


class OctoCNCPlugin(octoprint.plugin.StartupPlugin,
                    octoprint.plugin.TemplatePlugin,
                    octoprint.plugin.SettingsPlugin,
                    octoprint.plugin.AssetPlugin,
                    octoprint.plugin.UiPlugin,
                    api.API

                    ):

    def __init__(self):
        super().__init__()
        self._db = None
        self._position_timer = None
        self._comm = None

        self._isAbsolute = None

    def on_after_startup(self):

        import tornado.autoreload
        tornado.autoreload.start()
        for dir, _, files in os.walk(os.path.join(self._basefolder, 'octocnc')):
            [tornado.autoreload.watch(dir + '/' + f) for f in files if not f.startswith('.')]

        db_path = os.path.join(self.get_plugin_data_folder(), "octocnc.db")
        db.octocnc_db.init(db_path)

        db.octocnc_db.create_tables([models.CommandHistory], safe=True)

    def get_settings_defaults(self):
        return dict(url="myurl")

    def get_template_configs(self):
        return list()

    def get_template_vars(self):
        return {'static_url': "{}/static".format(self._basefolder)}

    def get_assets(self):
        return dict()

    def will_handle_ui(self, request):
        return True

    def on_ui_render(self, now, request, render_kwargs):
        from flask import make_response, render_template

        render_kwargs['user_management'] = self._user_manager.enabled

        return make_response(render_template("octocnc_index.jinja2", **render_kwargs))

    def _get_position_timer_interval(self):
        busy_default = 1
        target_default = 1

        if self._printer.is_ready():
            return target_default

        return busy_default

    def _poll_position(self):
        self._comm.sendCommand("M114", cmd_type="position_poll", tags={"trigger:octocnc.position_poll"})

    def set_automatic_updates(self, comm, script_type, script_name, *args, **kwargs):
        '''
        hook to clear the timer used for automatic temperature updates and replace it with a
        time for position updates at regular intervals
        '''

        if script_name == "beforePrinterDisconnected":
            if self._position_timer:
                self._position_timer.cancel()
                self._position_timer = None
            self._comm = None

        elif script_name == "afterPrinterConnected":
            self._comm = comm
            self._position_timer = RepeatedTimer(self._get_position_timer_interval, self._poll_position, run_first=True)
            self._position_timer.start()
            self._comm.sendCommand("M155 S0", cmd_type="disable_auto_temp", tags={"trigger:octocnc.on_connect"})
            self._comm.sendCommand("G90", )
            self._isAbsolute = True

        if comm._temperature_timer:
            comm._temperature_timer.cancel()
            comm._temperature_timer = None

        return None

    def examine_sent_gcode(self, comm, phase, cmd, cmd_type, gcode, subscode=None, tags=None, *args, **kwargs):

        if "G90" in gcode:
            self._isAbsolute = True

        if "G91" in gcode:
            self._isAbsolute = False


__plugin_name__ = "OctoCNC"
__plugin_pythoncompat__ = ">=2.7,<4"


def __plugin_load__():
    plugin = OctoCNCPlugin()

    global __plugin_implementation__
    __plugin_implementation__ = plugin

    global __plugin_hooks__
    __plugin_hooks__ = {
        "octoprint.comm.protocol.scripts": plugin.set_automatic_updates,
        "octoprint.comm.protocol.gcode.sent": plugin.examine_sent_gcode
    }
