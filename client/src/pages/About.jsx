import React from 'react'
import Helmet from '../components/Helmet'
import NavMenu from '../components/NavMenu'

const About = () => {
    return (
        <Helmet title='About Us'>
            <NavMenu />
            <div className="main">
                <div className="about">
                    <div className="about__content">
                        <div className="about__content__toggle">
                            <span>Tiếng Việt</span>
                            <i className='bx bx-chevron-right' ></i>
                        </div>
                        <div className="about__content__description">
                            Giữa lòng Saigon, Nhà Trên Cây là một văn phòng nhỏ, nơi mỗi ngày lui tới của khoảng một chục con người đang cùng nhau theo đuổi giấc mơ về thiết kế kiến trúc, nội thất, cảnh quan và xây dựng.

                            Chúng tôi luôn đặt lòng tin của mình vào việc tạo ra những công trình tốt, sử dụng hiệu quả, tính thẩm mỹ cao và được xây dựng đúng cách. Đối với chúng tôi, cái đúng luôn cần được đặt trên cái đẹp. Đó cũng là lý do chúng tôi dành nhiều thời gian đắm mình trong những dự án nhỏ với độ chi tiết cao và kỹ thuật xây dựng tỉ mỉ, thay vì những dự án quá lớn hoặc thời gian xây dựng quá vội vàng.

                            Bên cạnh đó, chúng tôi cũng có lòng tin vào tự nhiên. Vào cây cối, vào núi rừng, vào biển cả, và vào sức mạnh chữa lành của tự nhiên tới con người. Vì vậy việc theo đuổi những dự án có tính bền vững cao, đồng thời gần gũi với tự nhiên, luôn là ưu tiên của Nhà Trên Cây.

                            Trong khoảng 5 năm thành lập, chúng tôi đã thực hiện được khoảng hơn 30 công trình ở nhiều lĩnh vực khác nhau. Chúng tôi cũng chưa bao giờ tự giới hạn mình ở một dạng thiết kế đặc trưng nào. Điểm chung duy nhất của tất cả chúng, có lẽ nằm ở câu chuyện riêng của mỗi công trình.

                            Chúng tôi tin rằng mỗi dự án tìm đến mình đều là một câu chuyện chờ đợi được kể. Và nếu bạn đang có một câu chuyện như thế, Nhà Trên Cây luôn sẵn sàng để cùng đồng hành.
                        </div>
                    </div>
                    <div className="about__image">
                        <img src="https://uploads-ssl.webflow.com/5f743972b0cb15198b718f61/6136283d5382eca79adf8c2a_HOT.jpg" alt="" />
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default About
