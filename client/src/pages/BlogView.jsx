import React from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import Grid from '../components/Grid'
import Helmet from '../components/Helmet'
import NavMenu from '../components/NavMenu'

const recent = [
    {
        title: 'Và Khiêm Nhường',
        slug: 'va-khiem-nhuong',
        date: '26-05-2022',
        description: 'Dạo này có nhiều bạn liên lạc, gửi chúng tôi ảnh một mảnh rừng, một triền núi, một quãng sông.. Rồi các bạn hỏi liệu có thể dựng cái gì ở chỗ đó không...',
        image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5f7e6762e5802b5dff02c951_Secret%20Garden__0032_Layer%20209.jpg'
    },
    {
        title: 'Covid đã dạy chúng ta xây nhà ra sao?',
        slug: 'covid-da-day-ta',
        date: '26-05-2022',
        description: 'Những ngày này, thông tin về dịch bệnh rất nhiều. Theo đó cũng có rất nhiều người có các chuyên môn liên quan đến y tế, dịch tễ, quản lý, truyền thông.. đưa ra ý kiến của họ về cách hiểu và đối diện với đại dịch...',
        image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/61499843ed74c79ea081eb78_230469579_4533038153393514_956880890305100591_n.jpg'
    },
]

const BlogView = () => {
    return (
        <Helmet title='Blog-Detail'>
            <NavMenu mobile={true} />
            <div className="blog-des">
                <div className="blog-des__title">
                    <h2>Bởi làm gì có bình yên nào không xót xa?</h2>
                    <h3>Saigon, 2021</h3>
                </div>
                <div className="blog-des__image">
                    <img src="https://uploads-ssl.webflow.com/5f74397229df985194910095/61499b5e5f4b867847838c20_216680947_4453626274668036_7263069466519438097_n.jpg" alt="" />
                </div>
            </div>
            <div className="main">
                <div className="blog-content">
                    <Link to="/blogs">
                        <div className="blog-content__close">
                            <span>back</span>
                            <i className='bx bx-x' ></i>
                        </div>
                    </Link>
                    <div className="blog-content__title">
                        <h2>Bởi làm gì có bình yên nào không xót xa?</h2>
                        <h3>Saigon, 2021</h3>
                        <img src="https://uploads-ssl.webflow.com/5f74397229df985194910095/61499b5e5f4b867847838c20_216680947_4453626274668036_7263069466519438097_n.jpg" alt="" />
                    </div>
                    <div className="blog-content__info">
                        Buổi chiều bình lặng, chỉ có tiếng bàn phím lách cách, tiếng giấy sột soạt xen lẫn giọng hát rè rè phát ra từ cái loa cũ ở góc phòng. Bỗng câu hát cất lên chưa kịp tắt thì trời đã sụp tối, và mưa kéo về. Chúng tôi gác việc qua một bên, rủ nhau ra hiên ngồi, bắc ấm nước pha cà phê, lặng lẽ nhìn cơn bão đi qua ngoài cửa sổ. Tiếng xe cấp cứu ở đâu đó vọng lại chập chờn. Thỉnh thoảng lại có người trùm áo mưa phóng xe ngang qua ngoài phố, ngược chiều gió.

                        ‍

                        Có cả những người đi xe đạp, những người đi bộ, và những người không mặc áo mưa. Điều gì có thể mang ai đó ra khỏi nhà lúc này, ngay giữa cơn giông gió, nếu không phải vì chuyện mưu sinh ?

                        ‍

                        Saigon đang trải qua cơn đau mà suốt từ lúc sinh ra đến giờ chúng tôi chưa từng nhìn thấy, cũng chưa nghe ai kể lại chuyện tương tự bao giờ. Cơn đau này thực ra đã có thể dự đoán trước, nhưng người ta chọn phớt lờ nó cho những điều trước mắt, để mưu lợi và để mưu sinh. Như trong một câu nói quen, là Saigon lúc nào cũng hoa lệ. Hoa cho người giàu, và lệ của người nghèo.

                        ‍

                        Giờ thì chúng ta thấy chính bản thân mình lại đang ở ngay bên trong nó, chứng kiến nó, quan sát nó, hít ngửi và nếm trải nó. Ngay từ bên trong trái tim của cơn bão. Một trái tim không khỏe mạnh, nhịp đập hụt hẫng và buồn.

                        ‍

                        Mai hay là mốt, hay một ngày nào đó ở tương lai, khi đời sống trở về bình yên như thành phố sau sự tàn phá của một cơn giông gió, thì chắc chắn vẫn có những cái giá phải trả. Mà những người đầu tiên nhận về điều đó đâu ai khác ngoài những người vẫn lầm lũi đi qua lại bên ngoài cửa sổ khi nãy, trong cơn mưa bão hoang tàn.

                        ‍

                        Bởi làm gì có bình yên nào không xót xa ?

                        ‍

                        -House on Tree-
                    </div>
                    <div className="blog-content__social">
                        <span>Follow us on</span>
                        <a target="_blank" rel="noopener noreferrer" href="https://facebook.com" className="nav-menu__social__fb">
                            <i className='bx bxl-facebook'></i>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/" className="nav-menu__social__ins">
                            <i className='bx bxl-instagram' ></i>
                        </a>
                    </div>
                </div>
                <div className="blog-recent">
                    <Grid
                        col={2}
                        mdCol={2}
                        smCol={2}
                        gap={1}
                    >
                        {recent.map((item, index) => (
                            <BlogCard key={index} item={item} />
                        ))}
                    </Grid>
                </div>
            </div>
        </Helmet>
    )
}

export default BlogView
