from datetime import datetime
from peewee import CharField, DateTimeField

from . import db
from .constants import CommandStatus




class CommandHistory(db.OctoCNCModel):

	command = CharField()
	status = CharField(choices=CommandStatus.members())
	executed_on = DateTimeField(default=datetime.now)
	printer = CharField()
