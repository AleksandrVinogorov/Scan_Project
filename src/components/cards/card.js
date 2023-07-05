import moment from 'moment';
import { decoding } from '../decoding/decode';
function Card({ jsonData }) {

    const {
        issueDate,
        url,
        source: { name: sourceName },
        attributes: { isTechNews, isAnnouncement, isDigest, wordCount },
        title: { text: title },
        content: { markup },
    } = jsonData;

    const maxLength = 670;

    const formattedDate = moment(issueDate).format('DD.MM.YYYY');

    const { bgUrl, content } = decoding(markup);

    const truncatedContent = content.length > maxLength ? content.slice(0, maxLength) + '...' : content;

    let thumbnail = bgUrl

    const hasTags = isTechNews || isAnnouncement || isDigest;

    return (
        <>
            <div className="card-doc">
                <div className='card-doc__wrapper'>
                    <div className="card-doc__header">
                        <div className='card-doc__header-date'>{formattedDate}</div>
                        {Boolean(url) ? (
                            <a className="card-doc__header-source" href={url}>
                                {sourceName}
                            </a>
                        ) : (
                            <span>{sourceName}</span>
                        )}
                    </div>
                    <h1 className="card-doc__title">{title}</h1>
                    {hasTags && (
                        <div className="card-doc__news-type">
                            {isTechNews && (
                                <span>Технические новости</span>
                            )}

                            {isAnnouncement && (
                                <span>Анонсы и события</span>
                            )}

                            {isDigest && <span>Сводки новостей</span>}
                        </div>
                    )}
                    {Boolean(bgUrl) && (
                        <img className='card-doc__img' src={thumbnail} alt='qwe'></img>
                    )}
                    <div className="card-doc__description" dangerouslySetInnerHTML={{ __html: truncatedContent }} />
                    <div className="card-doc__footer">
                        <div>
                            {Boolean(url) && (
                                <form action={url}>
                                    <button
                                        className="card__footer-button"
                                    >
                                        Читать в источнике
                                    </button>
                                </form>
                            )}
                        </div>
                        <p className="card-doc__footer-count">{wordCount} слова</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Card




