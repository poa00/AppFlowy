import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as AlignLeftSvg } from '$app/assets/align-left.svg';
import { ReactComponent as AlignCenterSvg } from '$app/assets/align-center.svg';
import { ReactComponent as AlignRightSvg } from '$app/assets/align-right.svg';
import ActionButton from '$app/components/editor/components/tools/selection_toolbar/actions/_shared/ActionButton';
import { useTranslation } from 'react-i18next';
import { CustomEditor } from '$app/components/editor/command';
import { ReactEditor, useSlateStatic } from 'slate-react';
import { IconButton } from '@mui/material';
import { ReactComponent as MoreSvg } from '$app/assets/more.svg';
import { createHotkey, HOT_KEY_NAME } from '$app/utils/hotkeys';

export function Align() {
  const { t } = useTranslation();
  const editor = useSlateStatic();
  const align = CustomEditor.getAlign(editor);
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const Icon = useMemo(() => {
    switch (align) {
      case 'left':
        return AlignLeftSvg;
      case 'center':
        return AlignCenterSvg;
      case 'right':
        return AlignRightSvg;
      default:
        return AlignLeftSvg;
    }
  }, [align]);

  const toggleAlign = useCallback(
    (align: string) => {
      return () => {
        CustomEditor.toggleAlign(editor, align);
        handleClose();
      };
    },
    [editor, handleClose]
  );

  const getAlignIcon = useCallback((key: string) => {
    switch (key) {
      case 'left':
        return <AlignLeftSvg />;
      case 'center':
        return <AlignCenterSvg />;
      case 'right':
        return <AlignRightSvg />;
      default:
        return <AlignLeftSvg />;
    }
  }, []);

  useEffect(() => {
    const editorDom = ReactEditor.toDOMNode(editor, editor);
    const handleShortcut = (e: KeyboardEvent) => {
      if (createHotkey(HOT_KEY_NAME.ALIGN_LEFT)(e)) {
        e.preventDefault();
        e.stopPropagation();
        CustomEditor.toggleAlign(editor, 'left');
        return;
      }

      if (createHotkey(HOT_KEY_NAME.ALIGN_CENTER)(e)) {
        e.preventDefault();
        e.stopPropagation();
        CustomEditor.toggleAlign(editor, 'center');
        return;
      }

      if (createHotkey(HOT_KEY_NAME.ALIGN_RIGHT)(e)) {
        e.preventDefault();
        e.stopPropagation();
        CustomEditor.toggleAlign(editor, 'right');
        return;
      }
    };

    editorDom.addEventListener('keydown', handleShortcut);
    return () => {
      editorDom.removeEventListener('keydown', handleShortcut);
    };
  }, [editor]);
  return (
    <Tooltip
      placement={'bottom'}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      classes={{ tooltip: 'bg-fill-toolbar' }}
      title={
        <div className={'flex items-center justify-center'}>
          {['left', 'center', 'right'].map((key) => {
            return (
              <IconButton
                key={key}
                className={`text-icon-on-toolbar ${
                  align === key ? 'text-fill-hover' : ''
                } hover:bg-transparent hover:text-content-blue-400`}
                onClick={toggleAlign(key)}
              >
                {getAlignIcon(key)}
              </IconButton>
            );
          })}
        </div>
      }
    >
      <ActionButton active={!!align} tooltip={t('document.plugins.optionAction.align')}>
        <div className={'flex items-center'}>
          <Icon />
          <MoreSvg className={'rotate-90 transform'} />
        </div>
      </ActionButton>
    </Tooltip>
  );
}

export default Align;
