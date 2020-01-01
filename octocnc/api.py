from flask import jsonify, request, make_response
from octoprint.plugin import BlueprintPlugin
from octoprint.server import NO_CONTENT
from playhouse.shortcuts import model_to_dict

from . import models, constants


class API(BlueprintPlugin):
    @BlueprintPlugin.route("/command/send", methods=["POST"])
    def command(self):

        if not self._printer.is_operational():
            return make_response("Printer is not operational", 409)

        d = request.get_json()
        if 'command' in d and d['command']:
            (connection_string, port, baudrate, device) = self._printer.get_current_connection()

            models.CommandHistory.create(command=d['command'], status=constants.CommandStatus.COMPLETED.name,
                                         device=device['id'])

            self._printer.commands([d['command'], ])

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
