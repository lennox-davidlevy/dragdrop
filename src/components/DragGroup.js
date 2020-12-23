import React from 'react';
import DragItems from './DragItems';

const DragContainer = ({ data }) => {
  console.log(data);
  return (
    <div className="drag_drop">
      {data.map((item, key) => {
        const { id, title, items } = item;
        return (
          <div className="drag-group">
            <div className="group-title">{title}</div>
            <DragItems items={items} />
          </div>
        );
      })}
    </div>
  );
};

export default DragContainer;

{
  /* <div className="drag-group">
  <div className="group-title">Group 1</div>
  <div className="drag-item">
    <div className="item-title">Title</div>
    <div className="item-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
        vulputate ligula. Morbi accumsan neque et feugiat suscipit. In eu tellus
        sed ipsum faucibus tempus ut egestas enim. Mauris in pellentesque
        tortor. Aliquam placerat at orci ut consequat.
      </p>
    </div>
  </div>
  <div className="drag-item">
    <div className="item-title">Title</div>
    <div className="item-content">
      <p>
        Maecenas volutpat purus et elit iaculis lobortis at a nibh. Sed nec
        ligula placerat, placerat ipsum non, sollicitudin ipsum. Duis blandit
        ipsum quis urna sollicitudin rutrum. C
      </p>
    </div>
  </div>
</div>; */
}
