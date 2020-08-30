import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import 'app/styles/page/userShow.scss'
import BlogHeader from 'app/components/blog/BlogHeader'
import catalogIcons from 'static/userCatalogIcon.json'
import { IconFont } from 'app/components/common/config'
import Loading2 from 'app/components/common/Loading2'
import { ArticleItemConfig } from 'app/components/blog/LayoutContent'
import store from '../../redux/store'
import { Provider } from 'react-redux'
import ArticleContentContainer from '../../containers/ArticleContent_container'
import BackGround from 'app/components/common/BackGround';

import userBlogCatalogModel from 'model/userBlogCatalog.json'
import userInfoModel from 'model/userInfo.json'
import articleListModel from 'model/artileList.json'
import { deepCopy } from 'app/components/common/utils'

const stylePrefix = 'page-userShow'

interface UserShowRouterConfig {
    id: string
}

interface catalogItemConfig {
    typeID: number;
    type: string;
    number: string;
}

interface userInfoConfig {
    id: number;
    username: string;
    avatar: string;
    motto: string;
    nickname: string;
    email: string;
    year: string;
    role: number;
    permissions: string[];
    token: string;
}

export default function UserShow() {
    const params = useParams<UserShowRouterConfig>();
    const [catalog, setCatalog] = useState<catalogItemConfig[]>([])
    const [userInfo, setUserInfo] = useState<userInfoConfig | null>(null)
    const [activeIndex, setActiveIndex] = useState(0);
    const [mouseIndex, setMouseIndex] = useState<number | null>(null)
    const [articleList, setArticleList] = useState<ArticleItemConfig[]>([])
    const [page, setPage] = useState(1)

    const [loadingUserInfo, setLoadingUserInfo] = useState(false)
    const [loadingBlog, setLoadingBlog] = useState(false)
    useEffect(() => {
        initCatalog();
        initUserInfo();
    }, [])
    useEffect(() => {
        window.addEventListener('scroll', loadMore)
        setLoadingBlog(true)
        return () => {
            window.removeEventListener('scroll', loadMore)
        }
    }, [])
    useEffect(() => {
        initArticleList()
    }, [loadingBlog])
    // 滚动加载
    const loadMore = () => {
        //文档内容实际高度（包括超出视窗的溢出部分）
        var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        //滚动条滚动距离
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //窗口可视范围高度
        var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight);
        if (clientHeight + scrollTop >= scrollHeight) {
            setLoadingBlog(true)
        }
    }

    const initCatalog = async () => {
        console.log(params.id)
        setCatalog(userBlogCatalogModel.data);
    }

    const initUserInfo = async () => {
        console.log(params.id)
        setLoadingUserInfo(true)
        setTimeout(() => {
            setUserInfo(userInfoModel);
            setLoadingUserInfo(false)
        }, 2000);
    }
    const initArticleList = async () => {
        let articleListTemp: ArticleItemConfig[] = deepCopy(articleList)
        setTimeout(() => {
            console.log(page)
            setPage(page + 1)
            if (articleListTemp.length === 0) {
                setArticleList(articleListModel)
            } else {
                articleListTemp = articleListTemp.concat(articleListModel)
                setArticleList(articleListTemp)
            }
            setLoadingBlog(false)
        }, 5000);
    }
    return (
        <>
            <div className={`${stylePrefix}-layout`}>
                <BlogHeader activeIndex={null} />
                <div className={`${stylePrefix}-main`}>
                    <div className={`${stylePrefix}-sider`}>
                        <div className={`${stylePrefix}-catalog-layout`}>
                            <div className={`${stylePrefix}-title`}>
                                个人中心
                        </div>
                            <div className={`${stylePrefix}-catalog-main`}>
                                {
                                    catalog.map((catalogItem, index) => {
                                        return <div
                                            className={`${stylePrefix}-catalog-word-layout`}
                                            key={index}
                                            style={{
                                                backgroundColor: activeIndex === index || mouseIndex === index ? '#eee' : '#fff'
                                            }}
                                            onMouseOver={() => setMouseIndex(index)}
                                            onMouseOut={() => setMouseIndex(null)}
                                            onClick={() => setActiveIndex(index)}
                                        >
                                            <div className={`${stylePrefix}-catalog-word-value`}>
                                                <IconFont type={catalogIcons[catalogItem.typeID]} className={`${stylePrefix}-catalog-icon`} />
                                                <div>{catalogItem.type}</div>
                                            </div>
                                            <div className={`${stylePrefix}-catalog-number`}>{catalogItem.number}</div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        {
                            loadingUserInfo
                                ? <div className={`${stylePrefix}-loading-layout`}>
                                    <Loading2 />
                                </div>
                                : userInfo && <div className={`${stylePrefix}-info-layout`}>
                                    <img src={userInfo.avatar} alt="头像" className={`${stylePrefix}-info-avatar`} />
                                    <p className={`${stylePrefix}-nickname`}>{userInfo.nickname}</p>
                                    <p className={`${stylePrefix}-motto`}>{userInfo.motto}</p>
                                </div>
                        }
                    </div>
                    <div className={`${stylePrefix}-blog-layout`}>
                        <div className={`${stylePrefix}-blog-main`}>
                            {
                                articleList && articleList.map((articleItem, index) => {
                                    return (
                                        <Provider store={store} key={index}>
                                            <ArticleContentContainer
                                                item={articleItem}
                                                deleteAssignArticle={() => { }}
                                                allowEdit={false}
                                                articleID={articleItem.articleID}
                                            />
                                        </Provider>
                                    )
                                })
                            }
                        </div>
                        {
                            loadingBlog && <div className={`${stylePrefix}-loading-layout`} style={{ width: 900 }}>
                                <Loading2 />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <BackGround />
        </>
    )
}
