import moment from 'moment';

const Histogram = ({ riskFactorsData, totalDocuments }) => {
    let formattedDate;
    if (totalDocuments?.date) {
        formattedDate = moment(totalDocuments.date).format("DD.MM.YYYY");
    }
    return (
        <div className="history">
            <div className="history__wrapper">
                {totalDocuments?.date && <div id="date">{formattedDate}</div>}
                {totalDocuments?.value && <div id="total">{totalDocuments.value}</div>}
                <div id="value">{riskFactorsData?.value && <>{riskFactorsData.value}</>}</div>
            </div>
        </div>);
};

export default Histogram;

