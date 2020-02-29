from enum import Enum, EnumMeta, unique


# class EnumeratedEnumMeta(EnumMeta):
#     def __new__(mcs, *args):
#         enum_class = super(EnumeratedEnumMeta, self).__new__(mcs, *args)
#         enum_class._value2member_map_ = {m.value: m for v, m in enum_class._value2member_map_.items()}
#         return enum_class


class StructuredEnum(Enum):
    def __init__(self, value, kwargs):
        cls = self.__class__

        if any(self.value == e.value for e in cls):
            a = self.name
            e = cls(self.value).name
            raise ValueError("aliases not allowed in UniqueEnum:  %r --> %r" % (a, e))

        self._value_ = value
        for k, v in kwargs.items():
            setattr(self, k, v)

    @classmethod
    def members(cls):
        return cls.__members__.items()


class CommandStatus(StructuredEnum):
    PENDING = 1, {}
    ACTIVE = 2, {}
    SKIPPED = 3, {}
    COMPLETED = 4, {}
    ERROR = 5, {}


class Positioning(StructuredEnum):
    ABSOLUTE = 1, {}
    INCREMENTAL = 2, {}
    RELATIVE = 3, {}
