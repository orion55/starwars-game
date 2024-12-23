import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/shared/ui/dialog.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { useDialogStore } from '@/shared/stores/useDialogStore.ts';
import { Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCharactersStore } from '@/shared/stores/useCharacterStore.ts';

const MButton = motion.create(Button);

export const AlertDialog = () => {
  const { isOpen, closeDialog } = useDialogStore();
  const { setCurrentCharacter, currentCharacter, deleteCurrentCharacter } = useCharactersStore();

  const handleClose = () => {
    setCurrentCharacter(null);
    closeDialog();
  };

  const handleDelete = () => {
    deleteCurrentCharacter();
    closeDialog();
  };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(open) => !open && closeDialog()}
      size={['xs', 'xs', 'md', 'md']}
      placement='center'
      motionPreset='slide-in-bottom'
      lazyMount
      role='alertdialog'
    >
      <DialogContent backgroundColor='#0A0722' color='white' border='1px solid yellow'>
        <DialogHeader>
          <DialogTitle>Удалить персонажа</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text color='white'>
            Персонаж "
            <Text fontWeight='bold' as='span'>
              {currentCharacter?.name}
            </Text>
            " будет удалён безвозратно.
            <br />
            Вы уверены?
          </Text>
        </DialogBody>
        <DialogFooter>
          <MButton
            variant='outline'
            backgroundColor='#0A0722'
            size='xs'
            color='#fde047'
            border='#713f12 solid 1px'
            whileHover={{
              backgroundColor: '#facc15',
              color: '#fff',
              border: '#facc15 solid 1px',
              transition: {
                backgroundColor: { duration: 0.4 },
              },
            }}
            onClick={handleClose}
          >
            Отмена
          </MButton>
          <MButton
            colorPalette='red'
            size='xs'
            backgroundColor='#dc2626'
            whileHover={{
              backgroundColor: '#991919',
              transition: {
                backgroundColor: { duration: 0.4 },
              },
            }}
            onClick={handleDelete}
          >
            Удалить
          </MButton>
        </DialogFooter>
        <DialogCloseTrigger
          onClick={handleClose}
          color='#fde047'
          _hover={{ color: '#fff', bg: '#facc15' }}
        />
      </DialogContent>
    </DialogRoot>
  );
};
