'use client'
import ReactPaginate from "react-paginate"
import { useState, useEffect, useRef } from "react"
import { isEqual } from "../../../utils/equalCheck"
import { fetchContacts, setSelectedContact, toggleContactCard, toggleContactTableAction, toggleContactSelection, toggleAllContacts, toggleEditUser, toggleContactSortModal, setSearchFilter, applyFilters, moreInfoClick, toggleUploadContactModal, setContactTypeFilter, initialFilterState, removeAllFilters, fetchCauses } from "../../lib/features/contacts/contactSlice"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

const SubscriberTable = ({ itemsPerPage }) => {
    /* State management for contacts */
    const dispatch = useDispatch()
    /* Grabs all contacts */
    useEffect(() => {
        dispatch(fetchContacts())
        dispatch(fetchCauses()) // here since this component should always render i.e. doesn't start off hidden
    }, [dispatch])


    /* holds contacts, whether action dropdown is open, and which contacts the user has selected */
    const { contacts, searchResults, contactTableActionOpen, selectedContacts, selectedContact, editUserOpen, contactCardOpen, filter } = useSelector((state) => state.contact)


    // NEEDS TESTING
    useEffect(() => {
        const storedContacts = localStorage.getItem('selectedContacts');
        const storedCampaigns = localStorage.getItem('selectedCampaigns');

        // Define an async function inside the useEffect
        const fetchData = async () => {
            let contactsArray = JSON.parse(storedContacts) || [];

            if (storedCampaigns) {
                try {
                    const campaignsArray = JSON.parse(storedCampaigns);
                    const response = await axios.post('/api/campaigns/contacts', campaignsArray);
                    const additionalContacts = response.data; // Assuming this returns an array of contact IDs
                    contactsArray = [...new Set([...contactsArray, ...additionalContacts])];
                } catch (error) {
                    console.error('Failed to fetch campaign contacts', error);
                }
            }
            // Dispatch actions for each unique contact ID
            contactsArray.forEach(contactId => {
                dispatch(toggleContactSelection(contactId));
            });
            // Cleanup
            localStorage.removeItem('selectedContacts');
            localStorage.removeItem('selectedCampaigns');
        };

        // Call the async function
        fetchData();
    }, [dispatch]);
    /* Handle click outside of dropdown to close drowdown */
    const tableActionRef = useRef(null)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contactTableActionOpen && tableActionRef.current && !tableActionRef.current.contains(event.target)) {
                dispatch(toggleContactTableAction());
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch, contactTableActionOpen]);


    const handleAddUserClick = () => {
        dispatch(setSelectedContact(null))
        dispatch(toggleEditUser())
        dispatch(toggleContactTableAction());
        // dispatch(toggleContactCard())
    }
    /*
        Adds a contact to a list of selected contacts 
     */
    const handleSelectedContacts = (contact) => {
        dispatch(toggleContactSelection(contact));
    };

    const getFilteredContacts = () => {
        return contacts
    }
    /* 
        handles pagination, logic is taken from react-paginate github
     */
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [activeContacts, setActiveContacts] = useState(contacts)



    useEffect(() => {
        const active = isEqual(filter, initialFilterState) ? contacts : searchResults
        setActiveContacts(active)
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(active.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(active.length / itemsPerPage));

    }, [itemOffset, itemsPerPage, contacts, searchResults,filter]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % activeContacts.length;
        console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };

    const handleSearchChange = (event) => {
        dispatch(setSearchFilter(event.target.value))
        dispatch(applyFilters())
    };

    const handleContactTypeChange = (event, contact_type) => {
        event.preventDefault()
        dispatch(setContactTypeFilter(contact_type))
        dispatch(applyFilters())
        dispatch(toggleContactTableAction())
    }

    const handleShowAll = (event) => {
        event.preventDefault()
        dispatch(removeAllFilters())
        dispatch(applyFilters())
        dispatch(toggleContactTableAction())
    }

    const handleUpload = () => {
        dispatch(toggleUploadContactModal())
        dispatch(toggleContactTableAction());
    }

    const allChecked = () => {
        if (isEqual(filter, initialFilterState)) {
            return selectedContacts.length === contacts.length
        } else {
            return searchResults.every(result =>
                selectedContacts.some(selected => selected === result.id)
            );
        }
    }
    return (
        <div className="relative flex flex-col overscroll-none drop-shadow-xl h-[450px] lg:mt-10 flex-grow bg-white">
            <div className="sticky z-10 flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-100 ">
                <div ref={tableActionRef}>
                    <button id="dropdownActionButton" className="m-3 inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5" type="button" onClick={() => dispatch(toggleContactTableAction())}>
                        <span className="sr-only">Action button</span>
                        Action
                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                    {/* Dropdown Menu */}
                    <div id="dropdownAction" className={`${contactTableActionOpen ? '' : 'hidden'} fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 `}>
                        <ul className="py-1 text-sm text-gray-700 " aria-labelledby="dropdownActionButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  " onClick={handleAddUserClick}>Add Contact</a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100  " onClick={handleUpload}>Upload DONORS</a>
                            </li>
                            <li>
                                <button onClick={(event) => handleContactTypeChange(event, 'donor')} className="block w-full text-left px-4 py-2 hover:bg-gray-100  ">Show only Donors</button>
                            </li>
                            <li>
                                <button onClick={(event) => handleContactTypeChange(event, 'patient')} className="block w-full text-left px-4 py-2 hover:bg-gray-100  ">Show only Patients</button>
                            </li>
                            <li>
                                <button onClick={(event) => handleShowAll(event)} className="block w-full text-left px-4 py-2 hover:bg-gray-100  ">Show All</button>
                            </li>
                            <li>
                                <button href="#" className="block px-4 py-2 hover:bg-gray-100 w-full text-left " onClick={() => dispatch(toggleContactSortModal())}>Sort/Filter</button>
                            </li>

                        </ul>
                    </div>
                </div>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative m-3 w-full">

                    <input type="text" id="table-search-users" className="rounded-2xl block py-1 ps-2 text-sm text-gray-900 border border-gray-300 w-60 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  " placeholder="Search for contacts" onChange={handleSearchChange} />
                </div>
            </div>

            {/* Paginate This */}
            <div className="overflow-y-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className=" z-10 p-4 w-[48px]">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " onChange={() => dispatch(toggleAllContacts())} checked={allChecked()} />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className=" py-3">
                                Name
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {currentItems && currentItems.map((contact) => (
                            <tr key={contact.id} className="bg-white border-b  hover:bg-gray-50 ">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500   focus:ring-2  " checked={selectedContacts.includes(contact.id)} onChange={() => dispatch(toggleContactSelection(contact.id))} />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="flex items-center py-4 text-gray-900 ">

                                    <div className="">
                                        <div className="text-base break-words font-semibold flex flex-col">
                                            <span>{contact.name}</span>
                                        </div>
                                        <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                    </div>
                                </th>

                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
            <div className="absolute top-full w-full bg-white">
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={pageCount} // Replace with your total page count
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={0}
                    onPageChange={handlePageClick} // Replace with your page change handler
                    containerClassName="flex justify-end space-x-1 p-[12px]"
                    pageClassName="mr-1" // Tailwind classes for page items
                    pageLinkClassName="pb-2 pt-1 px-3 bg-white border-b border-gray-300 hover:bg-gray-100" // Tailwind classes for page links
                    activeClassName=" text-blue-500" // Tailwind classes for the active page
                    previousClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for previous button
                    nextClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100" // Tailwind classes for next button
                />
            </div>




        </div>
    )
}

export default SubscriberTable