#  DictionaryOperation.py

from typing import Dict, Generic, TypeVar

#
# DictionaryOperation
# -------------------
#
# # INTRO
#
# A DictionaryOperation groups together a collection of changes you want to
# perform on a dictionary.
#
# The individual changes it can contain are:
#  - create a new entry with a given key and value
#  - update an existing entry for a given key with a new value
#  - delete an existing entry for a given key
#
# For example, say you start with this dictionary:
#     dict_ = {
#         "Bob" : 10,
#         "Claire" : 45
#     }
#
# and you record the following changes:
#     op = DictionaryOperation()
#     op.record_create("Alice", 13)
#     op.record_update("Bob", 29)
#     op.record_delete("Claire")
#
# then you can apply all these changes to the dictionary at once:
#     op.apply_to_dict(dict_)
#
# to get the following result:
#     dict_ == {
#         "Alice" : 13,
#         "Bob" : 29,
#     }
#
#
# # COMBINING OPERATIONS
#
# Multiple operations can be coalesced into one combined operation.
#
# Say you have three dictionary operations opA, obB and opC that you want to
# apply to a dictionary in succession:
#    op_A.apply_to_dict(dict_)
#    op_B.apply_to_dict(dict_)
#    op_C.apply_to_dict(dict_)
#
# then instead, you can first combine these operations and apply the result:
#    combined_op = copy.copy(op_A)
#    combined_op.append(op_B)
#    combined_op.append(op_C)
#    combined_op.apply_to_dict(dict_)
#
# The resulting dictionary is exactly the same in both cases.
#
#
# # IMPLEMENTATION NOTES
#
# - Please flesh out the DictionaryOperation below. Feel free to change the API
#   as you see fit, the method stubs there are just to give you an idea of the
#   final functionality.
#
# - We want the dictionary operation to be a minimal representation of the
#   changes that need to be performed. That is, when it is applied to a
#   dictionary, it shouldn't e.g. update a value for a given key, and then
#   update the value for that same key again. Instead, it should only update
#   the dictionary once for a given key.
#

Key = TypeVar('Key')
Value = TypeVar('Value')
Dictionary = Dict[Key, Value]

class DictionaryOperation(Generic[Key, Value]):

    # ...

    def record_create(self, key: Key, value: Value):
        pass
        # ...

    def record_update(self, key: Key, value: Value):
        pass
        # ...

    def record_delete(self, key: Key):
        pass
        # ...

    def apply_to_dict(self, dict_: Dictionary):
        pass
        # ...

    def append(self, operation: DictionaryOperation[Key, Value]):
        pass
        # ...

