import { Nullable } from 'twenty-ui';

import { useDateField } from '@/object-record/record-field/meta-types/hooks/useDateField';
import { DateInput } from '@/ui/field/input/components/DateInput';

import { usePersistField } from '../../../hooks/usePersistField';

export type FieldInputEvent = (persist: () => void) => void;

export type DateFieldInputProps = {
  onClickOutside?: FieldInputEvent;
  onEnter?: FieldInputEvent;
  onEscape?: FieldInputEvent;
};

export const DateFieldInput = ({
  onEnter,
  onEscape,
  onClickOutside,
}: DateFieldInputProps) => {
  const { fieldValue, hotkeyScope, setDraftValue } = useDateField();

  const persistField = usePersistField();

  const persistDate = (newDate: Nullable<Date>) => {
    if (!newDate) {
      persistField(null);
    } else {
      const newDateISO = newDate?.toISOString();

      persistField(newDateISO);
    }
  };

  const handleEnter = (newDate: Nullable<Date>) => {
    onEnter?.(() => persistDate(newDate));
  };

  const handleEscape = (newDate: Nullable<Date>) => {
    onEscape?.(() => persistDate(newDate));
  };

  const handleClickOutside = (
    _event: MouseEvent | TouchEvent,
    newDate: Nullable<Date>,
  ) => {
    onClickOutside?.(() => persistDate(newDate));
  };

  const handleChange = (newDate: Nullable<Date>) => {
    setDraftValue(newDate?.toDateString() ?? '');
  };

  const dateValue = fieldValue ? new Date(fieldValue) : null;

  return (
    <DateInput
      hotkeyScope={hotkeyScope}
      onClickOutside={handleClickOutside}
      onEnter={handleEnter}
      onEscape={handleEscape}
      value={dateValue}
      clearable
      onChange={handleChange}
    />
  );
};
