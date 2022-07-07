import React from 'react'
import Helmet from '../components/Helmet'
import NavMenu from '../components/NavMenu'

const Contact = () => {
    return (
        <Helmet title='Contact'>
            <NavMenu />
            <div className="main">
                <div className="contact">
                    <div className="contact__image">
                        <img src="https://uploads-ssl.webflow.com/5f74397229df985194910095/6170bafa6c2939e9df272a8b_haha.jpeg" alt="" />
                        <p>in a little corner of Saigon</p>
                    </div>
                    <div className="contact__info">
                        <div className="contact__info__tel">
                            <a href="tel:0123456789">0123456789</a>
                            <a href="https://mail.google.com/" rel="noopener noreferrer" target="_blank">16design@gmail.com</a>
                            <p>Hai Phong, Viet Nam.</p>
                        </div>
                        <div className="contact__info__des">
                            <div className="contact__info__des__toggle">
                                <span>Tiếng Việt</span>
                                <i className='bx bx-chevron-right' ></i>
                            </div>
                            <div className="contact__info__des__content">
                                <h1>Bạn có một câu chuyện muốn kể?</h1>
                                <p>
                                    Bạn có một câu chuyện muốn kể?
                                    Nếu bạn có một dự án cần sự đồng hành của chúng tôi, một câu chuyện chờ đợi được kể, xin vui lòng nhập email liên lạc của bạn vào bên dưới. Một vài câu hỏi đơn giản sẽ xuất hiện ngay sau đó.

                                    Việc trả lời nhanh những câu hỏi này sẽ giúp chúng tôi hiểu hơn về dự án của bạn. Từ đó chúng tôi có thể phản hồi cho bạn cụ thể hơn, đồng thời cũng là để báo giá cho bạn chính xác hơn.

                                    Ngay khi nhận được thông tin từ bạn, chúng tôi sẽ sớm liên lạc lại với những hướng dẫn cần thiết.

                                    Cảm ơn bạn, vì đã tìm đến Nhà Trên Cây.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Contact
