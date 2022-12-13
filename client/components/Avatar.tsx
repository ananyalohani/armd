import Avatar from 'boring-avatars';

export default function PersonAvatar({ name }: { name: string }) {
  return (
    <Avatar
      size={24}
      name={name}
      variant='beam'
      colors={['#F6AD5595', '#63b3ed95', '#F5656595', '#68D39195', '#B794F495']}
    />
  );
}
