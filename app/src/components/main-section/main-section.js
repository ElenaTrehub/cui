import React from 'react';
import { Container, Jumbotron, Button} from 'reactstrap';
import {Link} from "react-router-dom";

const MainSection = () => {

    //const bgStyle = {backgroundImage: `url(${bg})`};
    const bgStyle = {backgroundImage: `url("images/photo1.jpg")`};
    return (
        <section className="main-section" style={bgStyle}>
            <Container>
                <Jumbotron>
                    <h1 className="display-3">Сайт за 1 час!</h1>
                    <p className="lead">Мы предложим Вам множество вариантов сайта по выбранной тематике. После корректировки скачайте файлы и выложите на свой хостинг. Все просто как никогда! </p>
                    <hr className="my-2" />
                    <p>Для пользования данным ресурсом не нужно обладать никакими знаниями в програмировании.</p>
                    <p className="lead">
                        <Link to="/rubrics"><Button color="primary">Создать сайт</Button></Link>
                    </p>
                </Jumbotron>
            </Container>
        </section>
    )
};
export default MainSection;