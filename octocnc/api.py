from flask import jsonify, request, make_response
from octoprint.plugin import BlueprintPlugin
from octoprint.server import NO_CONTENT
from playhouse.shortcuts import model_to_dict

from octocnc import Units
from . import models, constants


class API(BlueprintPlugin):
    @BlueprintPlugin.route("/command/send", methods=["POST"])
    def command(self):

        if not self._printer.is_operational():
            return make_response("Printer is not operational.", 409)

        d = request.get_json()
        if 'command' in d and d['command']:
            (connection_string, port, baudrate, device) = self._printer.get_current_connection()

            models.CommandHistory.create(command=d['command'],
                                         status=constants.CommandStatus.COMPLETED.name,
                                         device=device['id'])

            self._printer.commands([d['command'], ])

        return NO_CONTENT

    @BlueprintPlugin.route("/command/move/linear", methods=["POST"])
    def linear_move(self):

        if not self._printer.is_operational():
            return make_response("Printer is not operational.", 409)

        d = request.get_json()
        c = f"G0 X{d['x']} Y{d['y']} Z{d['z']} F{d['f']}"

        (connection_string, port, baudrate, device) = self._printer.get_current_connection()

        models.CommandHistory.create(command=c, status=constants.CommandStatus.COMPLETED.name, device=device['id'])

        self._printer.commands([c, ])

        return NO_CONTENT

    # @BlueprintPlugin.route("/command/set/abs", methods=["POST"])
    # def set_abs(self):
    #
    #     if not self._printer.is_operational():
    #         return make_response("Printer is not operational.", 409)
    #
    #     c = f"G90"
    #     self._printer.commands([c, ])
    #
    #     return NO_CONTENT
    #
    # @BlueprintPlugin.route("/command/set/rel", methods=["POST"])
    # def set_rel(self):
    #
    #     if not self._printer.is_operational():
    #         return make_response("Printer is not operational.", 409)
    #
    #     c = f"G91"
    #     self._printer.commands([c, ])
    #
    #     return NO_CONTENT

    @BlueprintPlugin.route("/command/set/<string:cmd>", methods=["POST"])
    def xyz(self, cmd):

        if not self._printer.is_operational():
            return make_response("Printer is not operational.", 409)

        c = None

        if 'ansi' in cmd:
            c = 'G20'
        elif 'metric' in cmd:
            c = 'G21'
        elif 'abs' in cmd:
            c = 'G90'
        elif 'rel' in cmd:
            c = 'G91'

        if not c:
            return make_response("Command not recognized: {}".format(cmd), 401)

        self._printer.commands([c, ])

        return NO_CONTENT

    @BlueprintPlugin.route("/command/history", methods=["GET"])
    def history(self):
        d = request.values

        results = []
        commands = models.CommandHistory.select().where(models.CommandHistory.device == d['device'],
                                                        models.CommandHistory.command != "")

        for command in commands:
            results.append(model_to_dict(command))

        return jsonify({'history': results})

    @BlueprintPlugin.route("/device/state", methods=["GET"])
    def status(self):

        p = self._positioning.name.lower() if self._positioning else 'none'
        u = self._units.name.lower() if self._units else 'none'

        return jsonify({
            'positioning': p,
            'units': u
        })
