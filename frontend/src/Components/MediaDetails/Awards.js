import { Fragment, useEffect } from "react";

const Awards = ({awards, summary}) => {
    console.log(awards)
    return (
        <Fragment>
            <h3 className="text-center text-sm capitalize">{summary}</h3>
                <table className="w-full table-auto mt-3 py-3">
                    <thead>
                        <tr className="text-sm">
                            <th>Award Name</th>
                            <th>Category</th>
                            {/* <th>Person</th> */}
                            <th>Year</th>
                            <th>Won</th>
                        </tr>
                    </thead>
                    <tbody className="w-full">
                    {awards.map(({ node }) => {
                        const {
                            id,
                            isWinner,
                            category,
                            award: { eventEdition: { year }, awardName },
                            secondaryAwardNames
                        } = node;

                        const secondaryNames = secondaryAwardNames ? secondaryAwardNames.map(name => name.name.text) : [];

                            return (
                                <tr key={id} className="h-8 px-1 text-xs text-center border-b-1 font-light">
                                    <th className="w-auto p-1 font-light">{awardName}</th>
                                    <th className="w-auto p-1 font-light">{category && category.text}</th>
                                    {/* <th className="w-auto p-1">{secondaryNames.join(', ')}</th> */}
                                    <th className="w-auto p-1 font-light">{year}</th>
                                    <th className="w-auto p-1 font-light">{isWinner ? "Won" : "Lost"}</th>
                                </tr>
                        );})}
                    </tbody>
                </table>
            </Fragment>
        );
    }

export default Awards;