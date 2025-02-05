import { useMemo } from 'react';
import { TextFilterData } from '$app/application/database';
import { TextFilterConditionPB } from '@/services/backend';
import { useTranslation } from 'react-i18next';

function TextFilterValue({ data }: { data: TextFilterData }) {
  const { t } = useTranslation();

  const value = useMemo(() => {
    if (!data.content) return '';
    switch (data.condition) {
      case TextFilterConditionPB.Contains:
      case TextFilterConditionPB.Is:
        return `: ${data.content}`;
      case TextFilterConditionPB.DoesNotContain:
      case TextFilterConditionPB.IsNot:
        return `: ${t('grid.textFilter.choicechipPrefix.isNot')} ${data.content}`;
      case TextFilterConditionPB.StartsWith:
        return `: ${t('grid.textFilter.choicechipPrefix.startWith')} ${data.content}`;
      case TextFilterConditionPB.EndsWith:
        return `: ${t('grid.textFilter.choicechipPrefix.endWith')} ${data.content}`;
      case TextFilterConditionPB.TextIsEmpty:
        return `: ${t('grid.textFilter.choicechipPrefix.isEmpty')}`;
      case TextFilterConditionPB.TextIsNotEmpty:
        return `: ${t('grid.textFilter.choicechipPrefix.isNotEmpty')}`;
      default:
        return '';
    }
  }, [t, data]);

  return <>{value}</>;
}

export default TextFilterValue;
