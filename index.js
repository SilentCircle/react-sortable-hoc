import 'babel-polyfill';
import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from './src/index';
import range from 'lodash/range';
import random from 'lodash/random';

const SortableItem = SortableElement(props => {
  return (
    <div style={{
        position: 'relative',
        width: '100%',
        display: 'block',
        padding: 20,
        backgroundColor: '#FFF',
        borderBottom: '1px solid #EFEFEF',
        boxSizing: 'border-box',
        WebkitUserSelect: 'none',
        height: props.height
    }}>
        Item {props.value}
        {props.children}
    </div>
  )
});

const SortableList = SortableContainer(({items, onRemove}) => (
    <div style={{
        width: '80%',
        height: '80vh',
        maxWidth: '500px',
        margin: '0 auto',
        overflow: 'auto',
        backgroundColor: '#f3f3f3',
        border: '1px solid #EFEFEF',
        borderRadius: 3
    }}>
        {
          items.map(({height, value}, index) => {
            return (
              <SortableItem key={`item-${index}`} index={index} value={value} height={height}>
                <a onClick={onRemove.bind(null, index)}>{'x'}</a>
              </SortableItem>
            )
          })
        }
    </div>
));

class Example extends Component {
    state = {
        items: range(100).map((value) => {
            return {
                value,
                height: random(49, 120)
            };
        })
    };
    onSortEnd = ({oldIndex, newIndex}) => {
        let {items} = this.state;

        this.setState({
            items: arrayMove(items, oldIndex, newIndex)
        });
    };
    onRemove = (index) => {
      console.log('index', index);
    };
    render() {
        const {items} = this.state;

        return <SortableList items={items} onRemove={this.onRemove} onSortEnd={this.onSortEnd} />;
    }
}

render(<Example />,
  document.getElementById('root')
)
