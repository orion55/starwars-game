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

const MButton = motion.create(Button);

export const AlertDialog = () => {
  const { isOpen, closeDialog } = useDialogStore();

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
      <DialogContent backgroundColor='gray.900' color='white'>
        <DialogHeader>
          <DialogTitle>Вы уверены?</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our systems.
          </Text>
        </DialogBody>
        <DialogFooter>
          <MButton
            variant='outline'
            backgroundColor='#18181b'
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
            onClick={closeDialog}
          >
            Отмена
          </MButton>
          <Button colorPalette='red' size='xs'>
            Удалить
          </Button>
        </DialogFooter>
        <DialogCloseTrigger
          onClick={closeDialog}
          color='#fde047'
          _hover={{ color: '#fff', bg: '#facc15' }}
        />
      </DialogContent>
    </DialogRoot>
  );
};
