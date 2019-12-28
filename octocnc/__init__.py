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
                    octoprint.plugin.BlueprintPlugin,
                    api.API

                    ):

    def __init__(self):
        self._db = None

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
        return [
            # dict(type="navbar", custom_bindings=False),
            # dict(type="settings", custom_bindings=False)
        ]

    def get_template_vars(self):
        return {'static_url': "{}/static".format(self._basefolder)}

    def get_assets(self):
        return dict(
            # js=["js/octocnc.js"],
            # less=["less/octocnc.less"],
        )

    def will_handle_ui(self, request):
        return True

    # def _filter_tabs(self, templates):
    # 	return [t for t in templates if t not in ('temperature', 'gcodeviewer', 'control')]

    def on_ui_render(self, now, request, render_kwargs):
        from flask import make_response, render_template

        render_kwargs['user_management'] = self._user_manager.enabled

        # render_kwargs.update(dict(
        # 	webcamStream=settings().get(["webcam", "stream"]),
        # 	enableTemperatureGraph=settings().get(["feature", "temperatureGraph"]),
        # 	enableAccessControl=True,  # enable_accesscontrol,
        # 	accessControlActive=True,  # accesscontrol_active,
        # 	enableSdSupport=settings().get(["feature", "sdSupport"]),
        # 	gcodeMobileThreshold=settings().get(["gcodeViewer", "mobileSizeThreshold"]),
        # 	gcodeThreshold=settings().get(["gcodeViewer", "sizeThreshold"]),
        # 	wizard=None,
        # 	now=now
        # ))
        #
        # render_kwargs['templates']['tab']['order'] = self._filter_tabs(render_kwargs['templates']['tab']['order'])
        #
        # self._logger.info(render_kwargs['templates'].keys())

        return make_response(render_template("octocnc_index.jinja2", **render_kwargs))

    def supress_temperature_on_connect(self, comm, script_type, script_name, *args, **kwargs):
        if not script_type == "gcode" or not script_name == "afterPrinterConnected":
            return None

        if comm._temperature_timer:
            comm._temperature_timer.cancel()
            comm._temperature_timer = None

        return None

    def _get_position_timer_interval(self):
        busy_default = 4.0
        target_default = 2.0

        if self.isBusy():
            return self._timeout_intervals.get("temperature", busy_default)

        for temp in [self._temp[k][1] for k in self._temp.keys()]:
            if temp > self._temperatureTargetSetThreshold:
                return self._timeout_intervals.get("temperatureTargetSet", target_default)

        if self._bedTemp and len(self._bedTemp) > 0 and self._bedTemp[1] > self._temperatureTargetSetThreshold:
            return self._timeout_intervals.get("temperatureTargetSet", target_default)

        return self._timeout_intervals.get("temperature", busy_default)

    def _poll_position(self):
        pass

    def create_position_update(self, comm, script_type, script_name, *args, **kwargs):

        self._position_timer = RepeatedTimer(self._get_position_timer_interval, self._poll_position, run_first=True)
        self._position_timer.start()

        if not script_type == "gcode" or not script_name == "afterPrinterConnected":
            return None

        if comm._temperature_timer:
            comm._temperature_timer.cancel()
            comm._temperature_timer = None

        return None


    # def suppress_temperature(self, comm, phase, cmd, cmd_type, gcode, *args, **kwargs):
    #
    #     # cancel the temperature timer
    #     if comm._temperature_timer:
    #         comm._temperature_timer.cancel()
    #         comm._temperature_timer = None
    #
    #     # supress the M105
    #     if gcode and gcode == "M105":
    #         return None,


__plugin_name__ = "OctoCNC"
__plugin_pythoncompat__ = ">=2.7,<4" # python 2 and 3

def __plugin_load__():
    plugin = OctoCNCPlugin()

    global __plugin_implementation__
    __plugin_implementation__ = plugin

    global __plugin_hooks__
    __plugin_hooks__ = {
        # "octoprint.comm.protocol.gcode.queuing": plugin.suppress_temperature,
        "octoprint.comm.protocol.scripts": plugin.supress_temperature_on_connect
    }
