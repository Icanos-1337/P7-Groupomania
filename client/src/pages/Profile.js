import React, {useEffect} from 'react';
import {MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBCardGroup} from "mdb-react-ui-kit";
import {useDispatch, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import { deletePost, getPosts, getPostsByUser } from '../redux/features/postSlice';
import Spinner from '../components/Spinner';
import { toast } from "react-toastify";

const Profile = () => {
    const {user} = useSelector((state) => ({...state.auth}));
    const {userPosts, loading} = useSelector((state) => ({...state.post}));
    const {posts} = useSelector((state) => ({...state.post,}));
    const userId = user?.result?._id;
    const isAdmin = user?.result?.isAdmin
    const dispatch = useDispatch();

    useEffect(() => {
        if(userId) {
            dispatch(getPostsByUser(userId))
        } 
    }, [userId]);

    useEffect(() => {
        if(isAdmin) {
            dispatch(getPosts(isAdmin))
        } 
    }, []);



    const excerpt = (str) => {
        if(str.length > 45) {
            str = str.substring(0, 45) + "..."
        }
        return str;
    };

    if(loading) {
        return <Spinner />;
      };

      const handleDelete = (id) => {
        if(window.confirm("Êtes vous sûr de supprimer ce poste ?")) {
            dispatch(deletePost({id, toast}))
        }
      }


      if(!isAdmin) {

      
  return (
    <div style={{margin: "auto", padding: "120px", maxWidth: "900px", alignContent: "center"}}>
        <h4 className='text-center'>Profile: {user?.result?.name}</h4>
        <hr style={{maxWidth: "570px"}}/>
        {userPosts && userPosts.map((item) => (
            <MDBCardGroup>
                <MDBCard style={{maxWidth: "600px"}} key={item._id} className="mt-2">
                    <MDBRow className="g-0">
                        <MDBCol md="4">
                            <MDBCardImage className='rounded' src={item.imageFile} alt={item.title} fluid/>
                        </MDBCol>
                        <MDBCol md="8">
                            <MDBCardBody>
                                <MDBCardTitle className='text-start'>
                                    {item.title}
                                </MDBCardTitle>
                                <MDBCardText className='text-start'>
                                    <small className="text-muted">
                                        {excerpt(item.description)}
                                    </small>
                                </MDBCardText>
                                <div style={{marginLeft: "5px", float: "right", marginTop: "-60px"}}>
                                    <MDBBtn className='mt-1' tag="a" color="none">
                                        <MDBIcon 
                                        fas
                                        icon="trash"
                                        style={{color: "#dd4b39"}}
                                        size="lg"
                                        onClick={() => handleDelete(item._id)}/>
                                    </MDBBtn>
                                    <Link to={`/editPost/${item._id}`}>
                                        <MDBIcon 
                                        fas
                                        icon="edit"
                                        style={{color: "#55acee", marginLeft: "10px"}}
                                        size="lg" />
                                    </Link>
                                    
                                
                                </div>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>
            </MDBCardGroup>
        ))}
        
    </div>
  )
    } else {
        return (
            <div style={{margin: "auto", padding: "120px", maxWidth: "900px", alignContent: "center"}}>
                <h4 className='text-center'>Profile: {user?.result?.name}</h4>
                <hr style={{maxWidth: "570px"}}/>
                {posts && posts.map((item) => (
                    <MDBCardGroup>
                        <MDBCard style={{maxWidth: "600px"}} key={item._id} className="mt-2">
                            <MDBRow className="g-0">
                                <MDBCol md="4">
                                    <MDBCardImage className='rounded' src={item.imageFile} alt={item.title} fluid/>
                                </MDBCol>
                                <MDBCol md="8">
                                    <MDBCardBody>
                                        <MDBCardTitle className='text-start'>
                                            {item.title}
                                        </MDBCardTitle>
                                        <MDBCardText className='text-start'>
                                            <small className="text-muted">
                                                {excerpt(item.description)}
                                            </small>
                                        </MDBCardText>
                                        <div style={{marginLeft: "5px", float: "right", marginTop: "-60px"}}>
                                            <MDBBtn className='mt-1' tag="a" color="none">
                                                <MDBIcon 
                                                fas
                                                icon="trash"
                                                style={{color: "#dd4b39"}}
                                                size="lg"
                                                onClick={() => handleDelete(item._id)}/>
                                            </MDBBtn>
                                            <Link to={`/editPost/${item._id}`}>
                                                <MDBIcon 
                                                fas
                                                icon="edit"
                                                style={{color: "#55acee", marginLeft: "10px"}}
                                                size="lg" />
                                            </Link>
                                            
                                        
                                        </div>
                                    </MDBCardBody>
                                </MDBCol>
                            </MDBRow>
                        </MDBCard>
                    </MDBCardGroup>
                ))}
                
            </div>
          )
    }
}

export default Profile;