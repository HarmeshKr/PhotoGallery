export function DialogBox(props){
 /*<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></button> */
    return (<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">{props.title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              <div className="modal-body">
                <h3>{props.message}</h3>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{props.noText}</button>
                <button type="button" className="btn btn-primary" onClick={e=>props.response(e)}>{props.yesText}</button>
              </div>
            </div>
          </div>
        </div>);
}