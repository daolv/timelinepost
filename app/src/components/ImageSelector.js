import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DropzoneArea } from 'material-ui-dropzone';
import ContentWraper from './ContentWraper'
import api from '../api/api';
import { v4 as uuidv4 } from 'uuid';
import Image from '../widgets/Image';
import AppContext from '../AppContext';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as Constant from "../Constant";

const useStyles = makeStyles((theme) => ({
    imageSelector: {
        width: '100%',
        padding: '15px'
    },
   
    paper: {
        textAlign: 'center'
    },
    uploadButton: {
        position: 'absolute',
        marginTop: '50px',
        marginLeft: '50px'
    }
}));

export default function ImageSelector(props) {
    const classes = useStyles();
    const [openDialog, setOpenDialog] = useState(false),
        [selectedFiles, setSelectedFiles] = useState([]),
        [disableUploadButton, setDisableUploadButton] = useState(false),
        { currentPost, setCurrentPost } = useContext(AppContext),
        [images, updateImages] = useState(currentPost.contentData.images);

    const removeImage = (image) => {
        let data = images.filter(s => s.id !== image.id);
        updateImages(data);
        if (currentPost.status === Constant.PostStatus.ADD) {
            api.removeImage(image);
        }
    };

    const uploadImages = async () => {
        let uploadedFiles = await api.uploadFiles(selectedFiles);
        uploadedFiles.map(s => s.id = uuidv4());
        updateImages(images.concat(uploadedFiles));
        setOpenDialog(false);
    };

    useEffect(() => {
        currentPost.contentData = { images: images };
        currentPost.contentType = Constant.ContentType.IMAGE;
        setCurrentPost(Object.assign({}, currentPost));
    }, [images]);

    useEffect(() => {
        setDisableUploadButton(selectedFiles.length === 0)
    }, [selectedFiles]);

    useEffect(() => {
        updateImages(currentPost.contentData.images);
    }, [currentPost.contentData.images]);

    const handleChangeUploadFile = async (files) => {
        // push selected image to list of selected files
        setSelectedFiles(files);
    };

    return (
        <div className={classes.imageSelector}  >
            <Grid item className={classes.imageList} xs={12}  >
                <div >
                    {images.map((image) => (
                        <ContentWraper key={image.id} removeItem={() => removeImage(image)} >
                            <Image image={image} />
                        </ContentWraper>
                    ))}
                    {images.length === 0 ? null :
                        <IconButton className={classes.uploadButton} onClick={() => setOpenDialog(true)} aria-label="upload picture">
                            <PhotoCamera />
                        </IconButton>
                    }
                </div>

            </Grid>
            <Grid item xs={12}  >
                <Paper elevation={0} className={classes.paper}>
                    {images.length === 0 ?
                        <IconButton onClick={() => setOpenDialog(true)} aria-label="upload picture" className={classes.uploadImage}>
                            <PhotoCamera />
                        </IconButton> : null
                    }
                </Paper>

            </Grid>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Upload photo</DialogTitle>
                <DialogContent>
                    <DropzoneArea
                        showPreviewsInDropzone={true}
                        dropzoneText="Drop your image here or click"
                        showAlerts={false}
                        filesLimit={5}
                        acceptedFiles={['image/*']}
                        onChange={handleChangeUploadFile}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
              </Button>
                    <Button disabled={disableUploadButton} onClick={() => uploadImages()} color="primary">
                        Upload
              </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}