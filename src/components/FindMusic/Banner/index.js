import { useRef } from 'react';
import { Carousel, Modal } from 'antd';
import './bannersStyle.less'
import { useState } from 'react';
function Banner () {
    const [visiable, setVisiable] = useState(false);//是否弹窗提示
    const [visiableUrl, setVisiableUrl] = useState('');//弹窗提示内容


    const [currentIndex, setCuttentIndex] = useState(0)
    const bannerRef = useRef();

    var banners = [
        'http://p1.music.126.net/wKdPp1Pdy6ueH9lDeN5HCg==/109951169443577352.jpg?imageView&quality=89',
        'http://p1.music.126.net/Iv7bVl_3bXamonu5LFWKgw==/109951169441583934.jpg?imageView&quality=89',
        'http://p1.music.126.net/d6QH1DzhJEoMWSE2-TQvyw==/109951169441597763.jpg?imageView&quality=89',
        'http://p1.music.126.net/RJ6ZHV1zPw-v3VQaU6z1Gw==/109951169446590314.jpg?imageView&quality=89',
        'http://p1.music.126.net/1AMztbg11DD6tP2aXgZ6FA==/109951169445930575.jpg?imageView&quality=89',
        'http://p1.music.126.net/OBwGAoF_MQFS1ci0p4PnLg==/109951169447691254.jpg?imageView&quality=89',
    ];
    /**事件处理函数 */
    function handlePrevClick () {//轮播图上一页
        bannerRef.current?.prev();
    }
    function handleNextClick () {//轮播图下一页
        bannerRef.current?.next();
    }
    function handlafterChange (current, next) {
        setCuttentIndex(next)//记录轮播图当前页面index
    }
    //背景图替换
    let baImageUrl = banners[currentIndex]?.replace(/\?.*$/, '?imageView&blur=40x20');
    if (baImageUrl) {
        baImageUrl = banners[currentIndex].replace(/\?.*$/, '?imageView&blur=40x20');
    }

    const fadeAnimation = {
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: 'beforeChildren',
                staggerChildren: 0.2,
            },
        },
        hidden: {
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    function handlebannerClick (url) {
        setVisiableUrl(url)
        setVisiable(true)
    }
    const onOk = () => {//弹窗点击OK按钮
        console.log("编写自己的onOk逻辑");
        closeModal();
    };
    const closeModal = () => {//弹窗点击关闭按钮
        setVisiable(false);
    };

    return (
        <div>
            <div className="banner" style={{ background: `url('${baImageUrl}') center center / 6000px` }}>
                <div className="content">
                    <div className="left">
                        <Carousel autoplay effect='fade' beforeChange={handlafterChange} ref={bannerRef}>
                            {
                                banners.map((item, index) => {
                                    return (
                                        <div className='item' key={item} onClick={() => handlebannerClick(item)}>
                                            <a href="#" className="pic">
                                                <img src={item}></img>
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                    <div className="right">
                        <a href="#">下载客户端</a>
                        <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                    </div>
                    <a href="#" className="button left-btn" onClick={handlePrevClick}></a>
                    <a href="#" className="button right-btn" onClick={handleNextClick}></a>
                </div>
            </div>
            <Modal
                title="温馨提示"
                open={visiable}
                onOk={onOk}
                onCancel={closeModal}
                afterClose={closeModal}
            >
                <p>暂无跳转路径</p>
                <p>{visiableUrl}</p>
            </Modal>
        </div>
    )
}
export default Banner