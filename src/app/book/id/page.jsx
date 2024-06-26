import { useLayoutEffect, useRef, useState } from "react";
import service from "@/utils/http";
import { Divider, IconButton, Skeleton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import classname from "classname";
import ArticleRenderer from "@/components/ArticleRenderer";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useParams } from "react-router-dom";
import PageGuideNav from "@/components/PageGuideNav/index.jsx";

import "./page.scss";

const Book = () => {
  const dividerRef = useRef();
  const params = useParams();
  const [navData, setNavData] = useState([]);
  const [articleData, setArticleData] = useState({
    CategoryId: 0,
    Content: null,
    CreatedAt: "",
    DeletedAt: "",
    ID: 0,
    Name: "",
    UpdatedAt: "",
  });
  const [hideMenu, setHideMenu] = useState(false);
  const [articleSelectedId, setArticleSelectedId] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const getTagsByCategoryId = async () => {
    return await service.get(`/tag/getTagsByCategoryId?id=${params.id}`);
  };

  const fetchArticleById = async (id) => {
    return await service.get(`/article/${id}`);
  };

  console.log("dividerRef", dividerRef.current);

  const init = async () => {
    const { Data, Success } = await getTagsByCategoryId();
    const resData = [];
    for (let data of Data) {
      data.isShow = true;
      if (data.ArticleCount > 0) {
        resData.push(data);
      }
    }
    const firstArticleId = resData[0].ArticleList[0].ID;
    const { Success: fetchArticleByIdSuccess, Data: fetchArticleByIdData } =
      await fetchArticleById(firstArticleId);
    setArticleSelectedId(firstArticleId);
    setArticleData(fetchArticleByIdData);
    setNavData(resData);
    setIsMounted(true);
  };

  const onSelectArticle = async (id) => {
    const { Success, Data } = await fetchArticleById(id);
    setArticleData(Data);
    setArticleSelectedId(id);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const foldTagItem = (tagId) => {
    const idx = navData.findIndex((i) => i.ID === tagId);
    navData[idx].isShow = !navData[idx].isShow;
    setNavData(JSON.parse(JSON.stringify(navData)));
  };

  const toggleMenuBtn = () => {
    setHideMenu((p) => !p);
  };

  useLayoutEffect(() => {
    init();
  }, []);

  if (!isMounted) {
    return (
      <div className="book-page-wrap">
        <div className="book-page">
          <div className="book-page-left">
            <Divider />
            <Skeleton
              style={{ margin: "10px" }}
              variant="rectangular"
              height={60}
            />
            <Divider />
            <Skeleton
              style={{ margin: "10px" }}
              variant="rectangular"
              height={60}
            />
            <Divider />
            <Skeleton
              style={{ margin: "10px" }}
              variant="rectangular"
              height={60}
            />
          </div>
          <Divider className="divider" orientation="vertical" flexItem />
          <div className="book-page-right">
            <IconButton sx={{ ml: 1 }} color="inherit" onClick={toggleMenuBtn}>
              <MenuOpenIcon
                style={{
                  transform: hideMenu ? "rotate(180deg)" : "",
                  transition: "ease-in-out 200ms",
                }}
              />
            </IconButton>
            <div className="article-wrap">
              <div style={{ flex: "1" }}>
                <Skeleton variant="rectangular" height={30} />
                <Skeleton
                  variant="rectangular"
                  height={80}
                  width={200}
                  style={{ margin: "20px auto 70px" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={20}
                  style={{ margin: "10px" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={40}
                  style={{ margin: "10px" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={10}
                  style={{ margin: "10px" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={10}
                  style={{ margin: "10px" }}
                />
                <Skeleton
                  variant="rectangular"
                  height={30}
                  style={{ margin: "10px" }}
                />
              </div>
              <div className="page-guide-nav-content-wrap">
                <Skeleton variant="rectangular" style={{ margin: "10px" }} />
                <Skeleton variant="rectangular" style={{ margin: "10px" }} />
                <Skeleton variant="rectangular" style={{ margin: "10px" }} />
                <Skeleton variant="rectangular" style={{ margin: "10px" }} />
                <Skeleton variant="rectangular" style={{ margin: "10px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="book-page-wrap">
        <div className="book-page">
          <section
            className="book-page-left"
            style={{
              display: hideMenu ? "none" : "block",
              transition: "ease-in-out 200ms",
            }}
          >
            {navData.map((navItem, index) => (
              <div key={navItem.ID}>
                {index !== 0 && <Divider />}
                <div className="tag-item">
                  <div
                    className="tag-item-title-wrap"
                    onClick={() => foldTagItem(navItem.ID)}
                  >
                    <div className="title">{navItem.Name}</div>
                    <KeyboardArrowRightIcon
                      className={classname({
                        arrow: true,
                        show: navItem.isShow,
                      })}
                    ></KeyboardArrowRightIcon>
                  </div>
                  {navItem.isShow && navItem.ArticleCount > 0 && (
                    <div className="tag-article-list">
                      {navItem.ArticleList.map((article) => (
                        <div
                          className={classname({
                            "tag-article-item": true,
                            selected: article.ID === articleSelectedId,
                          })}
                          onClick={() => onSelectArticle(article.ID)}
                          key={article.ID}
                        >
                          {article.Name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </section>
          <Divider
            ref={dividerRef}
            className="divider"
            orientation="vertical"
            flexItem
            style={{ display: hideMenu ? "none" : "block" }}
          />
          <div className="book-page-right">
            <IconButton sx={{ ml: 1 }} color="inherit" onClick={toggleMenuBtn}>
              <MenuOpenIcon
                style={{
                  transform: hideMenu ? "rotate(180deg)" : "",
                  transition: "ease-in-out 200ms",
                }}
              />
            </IconButton>
            <div className="article-wrap">
              <div style={{ flex: "1" }}>
                <h1 className="article-title">{articleData.Name}</h1>
                <div className="article-content">
                  <ArticleRenderer data={articleData}></ArticleRenderer>
                </div>
              </div>
              <PageGuideNav source={articleData.Content} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
