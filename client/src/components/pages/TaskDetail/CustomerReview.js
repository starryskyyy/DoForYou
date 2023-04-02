import { useState } from "react";

import { Button } from "../../Button";
import ModalReviewCustomer from "../../modals/ModalReviewCustomer";

function CustomerReview(props) {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button
                buttonStyle="btn--primary-yellow"
                buttonSize="btn--large-bold"
                buttonRadius="btn--half-rounded"
                type="submit"
                onClick={() => setShow(true)}
            >
                Write Review For Customer
            </Button>

            <ModalReviewCustomer
                onClose={() => setShow(false)}
                show={show}
                task={props.task}
            />
        </>
    )
}

export default CustomerReview;