from peewee import SqliteDatabase, Model

octocnc_db = SqliteDatabase(None)

class OctoCNCModel(Model):
    class Meta:
        database = octocnc_db
        abstract = True
