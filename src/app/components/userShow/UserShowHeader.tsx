import React, { useState } from 'react'
import 'app/styles/user/userShowHeader.scss'
import { isMobile } from '../common/utils'
import AuthorShow_container from 'containers/AuthorShow_container'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { IconFont } from '../common/config'
import userBlogCatalogModel from 'model/userBlogCatalog.json'
import catalogIcons from 'static/userCatalogIcon.json'
import MenuIcon from '../common/MenuIcon'

const stylePrefix = 'user-header'

interface UserShowHeaderConfig {
    activeIndex: number
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>
}

export default function UserShowHeader({ activeIndex, setActiveIndex }: UserShowHeaderConfig) {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <>
            <div className={`${stylePrefix}-main`} >
                {/* <IconFont
                    type='anticoncaidan'
                    className={`${stylePrefix}-menu-icon`}
                    onClick={() => setShowMenu(!showMenu)}
                    style={{
                        backgroundColor: showMenu ? '#eee' : '#fff'
                    }}
                /> */}
                <MenuIcon />
                <p className={`${stylePrefix}-title`}>个人中心</p>
                <Provider store={store}>
                    <AuthorShow_container top={isMobile() ? 10 : 1} labelTop={60} isHome={false} />
                </Provider>
            </div>
            <div className={`${stylePrefix}-menu-layout`}>
                {
                    userBlogCatalogModel.data.map((userBlogCatalogItem, index) => {
                        return <div
                            className={`${stylePrefix}-menu-item`}
                            key={index}
                            style={{
                                height: showMenu ? 40 : 0,
                                backgroundColor: activeIndex === index ? '#eee' : 'transparent'
                            }}
                            onClick={() => setActiveIndex(index)}
                        >
                            {
                                showMenu
                                    ? <>
                                        <div className={`${stylePrefix}-menu-item-words-layout`}>
                                            <IconFont
                                                type={catalogIcons[userBlogCatalogItem.typeID]}
                                                className={`${stylePrefix}-menu-item-icon`}
                                            />
                                            <p className={`${stylePrefix}-menu-item-word`}>
                                                {userBlogCatalogItem.type}
                                            </p>
                                        </div>
                                        {
                                            userBlogCatalogItem.number !== '0'
                                            && <div className={`${stylePrefix}-catalog-number`}>{userBlogCatalogItem.number}</div>
                                        }
                                    </>
                                    : <div></div>
                            }
                        </div>
                    })
                }
            </div>
        </>
    )
}