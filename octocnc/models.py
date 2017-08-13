from datetime import datetime
from peewee import CharField, DateTimeField

from . import db, constants





class CommandHistory(db.OctoCNCModel):

	command = CharField()
	status = CharField(choices=constants.CommandStatus.members())
	executed_on = DateTimeField(default=datetime.now)
	device = CharField()
