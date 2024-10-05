import './index.css'

const TabItem = props => {
  const {tabDetails, isActive, updateTab} = props
  const {id, tab} = tabDetails
  //   console.log('active_tap_id', isActive)

  const onClickTab = () => {
    updateTab(id)
  }

  return (
    <li>
      <button
        className={`tab_button ${isActive ? 'active' : 'not_active'}`}
        type="button"
        onClick={onClickTab}
      >
        {tab}
      </button>
    </li>
  )
}
export default TabItem