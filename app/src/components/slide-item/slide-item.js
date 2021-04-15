import React from 'react';

const SlideItem = ({slideText, slideImg, slideHeading}) => {
    return (
        <div>
            <div className="uk-card uk-card-default">
                <div className="uk-card-media-top">
                    <img src={slideImg} alt=""/>
                </div>
                <div className="uk-card-body">
                    <h3 className="uk-card-title">{slideHeading}</h3>
                    <p>{slideText}</p>
                </div>
            </div>
        </div>
    )

};
export default SlideItem;