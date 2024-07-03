// DraggableItem.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableItem = ({ item, index, moveItem }) => {
  const ref = React.useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '4px',
        cursor: 'move',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      className='border rounded-xl'
    >
      <p className="basis-5">{item.id}</p>
      <div className="rounded-full m-3 overflow-hidden w-24 h-24">
        <img
          src={item.photo ? item.photo : load}
          alt={item.photo}
          width={"100%"}
          height={"auto"}
        />
      </div>
      <div className="basis-1/2">
        <p className="text-xl">
          Title: {item.title ? item.title : "loading.."}
        </p>
      </div>
      <div className="basis-56 px-10">
        <p className="text-lg">
          Username: {item.title ? item.username : "loading.."}
        </p>
      </div>
      <div className="basis-56">
        <p className="text-lg">
          Likes: {item.title ? item.like : "loading.."}
        </p>
      </div>
    </div>
  );
};

export default DraggableItem;
