import Histogram from "./histogram";
import compareItemsByDate from "./compare";
function Histograms({ history, currentIndex, getSlideCount }) {
    const startIndex = currentIndex;
    const endIndex = currentIndex + getSlideCount();
    const totalDocumentsData = history.data[0].data.sort(compareItemsByDate);
    const riskFactorsData = history.data[1].data.sort(compareItemsByDate);
    const totalDocumentsDataSlice = totalDocumentsData.slice(startIndex, Math.min(endIndex, totalDocumentsData.length));
    const riskFactorsDataSlice = riskFactorsData.slice(startIndex, endIndex);

    return (
        <>
            <div className="slider__container-titles">
                <p>Период</p>
                <p>Всего</p>
                <p>Риски</p>
            </div>
            <div className="slider__container-content">
                {totalDocumentsDataSlice.map((totalDocumentsItem, index) => (
                    <Histogram
                        key={totalDocumentsItem.date}
                        totalDocuments={totalDocumentsItem}
                        riskFactorsData={riskFactorsDataSlice[index]}
                    />
                ))}
            </div>
        </>
    );
}

export default Histograms;