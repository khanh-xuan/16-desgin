import React from 'react'
import BlogCard from '../components/BlogCard'
import Grid from '../components/Grid'
import Helmet from '../components/Helmet'
import NavMenu from '../components/NavMenu'

const blogs = [
    {
        title: 'Và Khiêm Nhường',
        date: '26-05-2022',
        slug: 'va-khiem-nhuong',
        description: 'Dạo này có nhiều bạn liên lạc, gửi chúng tôi ảnh một mảnh rừng, một triền núi, một quãng sông.. Rồi các bạn hỏi liệu có thể dựng cái gì ở chỗ đó không...',
        image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5f7e6762e5802b5dff02c951_Secret%20Garden__0032_Layer%20209.jpg'
    },
    {
        title: 'Covid đã dạy chúng ta xây nhà ra sao?',
        slug: 'covid-da-day-chung-ta-ra-sao',
        date: '26-05-2022',
        description: 'Những ngày này, thông tin về dịch bệnh rất nhiều. Theo đó cũng có rất nhiều người có các chuyên môn liên quan đến y tế, dịch tễ, quản lý, truyền thông.. đưa ra ý kiến của họ về cách hiểu và đối diện với đại dịch...',
        image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/61499843ed74c79ea081eb78_230469579_4533038153393514_956880890305100591_n.jpg'
    },
    {
        title: 'Viết về quê hương',
        slug: 'viet-ve-que-huong',
        date: 'August 8, 2021',
        description: 'Tôi sinh ra ở Saigon, giữa những dãy nhà phố lô nhô cùng thanh âm xôn xao không bao giờ ngừng nghỉ. Tuổi nhỏ, mỗi mùa hè nhìn bạn bè được bố mẹ cho "về quê" chơi, còn mình chôn chân lại thành thị giữa mấy bức tường, bỗng thấy lòng dấy lên nỗi thèm thuồng khó lý giải..',
        image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/61129635ca88774f6ea9d0a5_nhatrencay%20blog%20080821.jpg'
    },
    {
        title: 'Và Khiêm Nhường',
        slug: 'va-khiem-nhuong-1',
        date: '26-05-2022',
        description: 'Dạo này có nhiều bạn liên lạc, gửi chúng tôi ảnh một mảnh rừng, một triền núi, một quãng sông.. Rồi các bạn hỏi liệu có thể dựng cái gì ở chỗ đó không...',
        image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5f7e6762e5802b5dff02c951_Secret%20Garden__0032_Layer%20209.jpg'
    },
    {
        title: 'Covid đã dạy chúng ta xây nhà ra sao?',
        slug: 'covid-da-day',
        date: '26-05-2022',
        description: 'Những ngày này, thông tin về dịch bệnh rất nhiều. Theo đó cũng có rất nhiều người có các chuyên môn liên quan đến y tế, dịch tễ, quản lý, truyền thông.. đưa ra ý kiến của họ về cách hiểu và đối diện với đại dịch...',
        image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/61499843ed74c79ea081eb78_230469579_4533038153393514_956880890305100591_n.jpg'
    },
    {
        title: 'Viết về quê hương',
        slug: 'viet-ve-qh',
        date: 'August 8, 2021',
        description: 'Tôi sinh ra ở Saigon, giữa những dãy nhà phố lô nhô cùng thanh âm xôn xao không bao giờ ngừng nghỉ. Tuổi nhỏ, mỗi mùa hè nhìn bạn bè được bố mẹ cho "về quê" chơi, còn mình chôn chân lại thành thị giữa mấy bức tường, bỗng thấy lòng dấy lên nỗi thèm thuồng khó lý giải..',
        image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/61129635ca88774f6ea9d0a5_nhatrencay%20blog%20080821.jpg'
    },
]

const Blogs = () => {
    return (
        <Helmet title='Blogs'>
            <NavMenu />
            <div className="main">
                <Grid
                    col={2}
                    mdCol={2}
                    smCol={2}
                    gap={1}
                >
                    {blogs.map((item, index) => (
                        <BlogCard key={index} item={item} />
                    ))}
                </Grid>
            </div>
        </Helmet>
    )
}

export default Blogs
