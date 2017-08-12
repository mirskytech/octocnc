from flask import jsonify, request, make_response
from octoprint.plugin import BlueprintPlugin
from octoprint.server import NO_CONTENT

from . import models, constants


class API(object):

	@BlueprintPlugin.route("/command", methods=["POST"])
	def command(self):

		if not self._printer.is_operational():
			return make_response("Printer is not operational", 409)

		command = request.get_json()['command']

		models.CommandHistory.create(command=command, status=constants.CommandStatus.COMPLETED.name)

		self._printer.commands([command, ])

		return NO_CONTENT


	@BlueprintPlugin.route("/history", methods=["GET"])
	def history(self):
		pass
