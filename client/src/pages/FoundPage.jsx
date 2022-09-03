import { connect } from 'react-redux'
import React, { useState, useEffect } from 'react'
import { Button, Form, InputGroup, Modal, Tab, Tabs, } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { toast } from 'react-toastify';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createLofoItem } from '../apis'
import LoFoCard from '../components/LoFoCard'
import { themeColor } from '../styles';

function FoundPage(props) {

    const { lofoItems } = props;
    const [posting, setPosting] = useState(false)
    const [open, setOpen] = useState(false)
    // const [data, setData] = useState([]);
    const [found, setFound] = useState([]);
    const [search, setSearch] = useState('');
    const [file, setFile] = useState('');

    useEffect(() => {
        setFound(
            lofoItems.filter(item => item.status === 'found' && item.title.toLowerCase().includes(search.toLowerCase()))
        );
    }, [search, lofoItems])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = e.target
        const newItem = new FormData(formData)
        newItem.append('status', 'found')

        if (file !== '') {
            if (!file.type.includes('image')) {
                toast.warning('Please select image files only, e.g: png, jpg, jpeg etc')
                setPosting(false)
                return
            }
        }
        setPosting(true)
        createLofoItem(newItem)
            .then(res => {
                console.log(res)
                toast.success(`Posted: ${res.data.title}`);
                setFound(prev => [res.data, ...prev])
                setPosting(false);
                setOpen(false)
            })
            .catch(err => {
                setPosting(false)
                toast.error("Failed to post");
                console.log(err)
            })
    };

    function Data(props) {
        return (
            <>
                <div className="container-fluid" style={{ bgColor: "#555" }}>
                    <div className="row mt-3">
                        {
                            props.items.length === 0 ? <h6 className='text-center text-secondary mt-5'>No items!</h6> :
                                props.items.map((item, i) =>
                                    <div key={i} className="col-12 col-md-6 p-0 py-2 p-md-2">
                                        <LoFoCard
                                            setFound={setFound}
                                            item={item} />
                                    </div>
                                )
                        }
                    </div>
                </div>

            </>
        )
    }
    return (
        <>
            <div className="py-3 container-lg px-3 px-md-4">

                <div className='d-flex mb-3 ms-2 p-0 justify-content-between'>
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                    }} className='w-50' >
                        <InputGroup >
                            <Form.Control
                                placeholder='Search...'
                                className='non-outlined-btn'
                                onChange={(e) => setSearch(e.target.value)} value={search}
                                style={{
                                    borderRight: 'none'
                                }} />
                            <Button size='sm' onClick={() => setSearch('')}
                                variant='transparent' className='text-secondary'
                                style={{
                                    border: '1px solid #ced4da',
                                    borderLeft: 'none'
                                }}
                            ><FontAwesomeIcon icon={faTimes}
                                style={{
                                    opacity: search === '' ? '0' : '1'
                                }}
                                /></Button>

                        </InputGroup>
                    </Form>
                    <div className='p-1 px-2 my-auto rounded ' role={'button'} onClick={() => setOpen(true)}
                        style={{
                            fontSize: 13,
                            backgroundColor: '#' + themeColor,
                            color: "#fff"
                        }}
                    >
                        <FontAwesomeIcon icon={faPlus} /><span className='ms-2'>Add a Found Item</span>
                    </div>
                </div>

                <Tabs
                    className='d-flex mx-md-2'
                    defaultActiveKey="found"
                    transition={false}
                    id="noanim-tab-example"

                >
                    <Tab eventKey="found" title="Found Items">
                        <Data items={found} />
                    </Tab>
                </Tabs>

                <Modal className='p-0' onHide={() => setOpen(false)} show={open}>
                    <Modal.Header className='fw-bold d-flex justify-content-between'>
                        <span>Add a Found Item</span>
                        <span><FontAwesomeIcon size='lg' icon={faTimes} onClick={() => setOpen(false)} role='button' /></span>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex flex-wrap justify-content-center">
                            <form className="needs-validation" id="itemForm" noValidate="" onSubmit={handleSubmit} >
                                <div className="row g-4">
                                    <div className="col-12">
                                        <label htmlFor="productTitle" className="form-label">Title<span className='text-danger fw-bold'>*</span></label>
                                        <input autoCapitalize="sentences" required type="text" className="form-control custom-form" id="productTitle" placeholder="Enter Title" name="title" />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="description" className="form-label">Description<span className='text-danger fw-bold'>*</span> </label>
                                        <div className="input-group has-validation">
                                            <textarea autoCapitalize="sentences" required className="form-control custom-form" id="description" placeholder="Enter Description" name="description" />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-center flex-column bd-highlight mb-3">

                                        <div className="col-6 d-flex justify-content-center flex-column bd-highlight mb-4">
                                            <label htmlFor="date" className="form-label" required>Date of found/Found<span className='text-danger fw-bold'>*</span></label>
                                            <input required min="0" type="date" className="form-control" id="date" placeholder="Choose Date" name="date" />
                                        </div>

                                        <div className="col-12 d-flex justify-content-center flex-column bd-highlight mb-3">
                                            <label htmlFor="image1" className="form-label">Upload Image e.g:  png, jpg, jpeg</label>
                                            <input onChange={(e) => setFile(e.target.files[0])} type="file" accept="image/*" className="form-control" id="image1" placeholder="Required" name="file1" />
                                        </div>
                                    </div>
                                </div>

                                <hr className="mb-3" />
                                <div className="d-flex gap-3 w-50 m-auto bd-highlight mb-3 justify-content-center ">
                                    <button className="w-100 btn btn-danger btn-sm" type="reset">
                                        Reset
                                    </button>
                                    <button disabled={posting} className="w-100 btn btn-success btn-sm" type="submit">
                                        {posting ? "Posting..." : "Post"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>

                <br />
            </div>

        </>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        auth: state.authorised,
        lofoItems: state.lofoItems,
        authLoading: state.authLoading
    }
};

export default withRouter(connect(mapStateToProps)(FoundPage));
