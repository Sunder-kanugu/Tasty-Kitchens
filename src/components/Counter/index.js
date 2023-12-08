import './index.css'

const Counter = props => {
  const {quantity, onIncrement, onDecrement, addItem, testIdValues} = props
  const {dec, inc, current} = testIdValues

  const onClickAddBtn = () => {
    addItem()
  }

  const onClickIncrement = () => {
    onIncrement()
  }

  const onClickDecrement = () => {
    onDecrement()
  }

  return quantity > 0 ? (
    <div className="items-counter">
      <button
        data-testid={dec}
        className="dec-inc-btn"
        type="button"
        onClick={onClickDecrement}
      >
        -
      </button>
      <div data-testid={current} className="item-quantity">
        {quantity}
      </div>
      <button
        data-testid={inc}
        className="dec-inc-btn"
        type="button"
        onClick={onClickIncrement}
      >
        +
      </button>
    </div>
  ) : (
    <button onClick={onClickAddBtn} type="button" className="food-add-btn">
      ADD
    </button>
  )
}

export default Counter
