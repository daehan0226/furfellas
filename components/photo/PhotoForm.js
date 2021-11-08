import { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import { Button, InputFile, Select, Input, Loading } from "../common";
import { useSelect, useInput } from "../../hooks";
import { useAction, useLocation, usePhotoType } from "../../contexts";
import uploadService from "../../utils/uploadService";
import { deleteResources } from "../../utils";
import { DatePicker } from 'antd';
import { FlexCenterBox } from "../../styles/common-styles";


const Container = styled.section`
  display: flex;
  flex-direction: column;
`;


const SubContainer = styled.section`
  margin: 10px;
`;

const Selects = styled.div`
  padding: 6px;
  ${FlexCenterBox};
  flex-wrap: wrap;
  justify-content: flex-start;
  > * {
    margin: 10px 10px;
}
`;

const Image = styled.img`
  width: 200px;
  height: auto;
`;

const ButtonWrap = styled.div`
  width: 100%;
  height: 60px;
`;

const PhotoForm = ({ data, refreshPhotos = () => { } }) => {
  const typeSelect = useSelect("who", usePhotoType);
  const actionSelect = useSelect("what", useAction);
  const locationSelect = useSelect("where", useLocation);
  const [loading, setLoading] = useState(false);
  const [openSubmit, setOpenSubmit] = useState(false);
  const [file, setFile] = useState(null);
  const [descInput, descInputErr] = useInput("Description");
  const [datetime, setDatetime] = useState("");

  useEffect(() => {
    if (data) {
      typeSelect.setSelectedItems([data.type]);
      actionSelect.setSelectedItems(data.actions);
      locationSelect.setSelectedItems([data.location]);
      descInput.onChange(data.description);
    }
  }, [data]);

  useEffect(() => {
    if (descInput.value.length > 40) {
      setOpenSubmit(false);
      descInputErr.setMsg("too long");
    } else {
      setOpenSubmit(true);
      descInputErr.setMsg("");
    }
  }, [descInput.value]);

  useEffect(() => {
    setOpenSubmit(false);
    if (typeSelect.selectedItems.length === 0) {
      return;
    }
    if (actionSelect.selectedItems.length === 0) {
      return;
    }
    if (locationSelect.selectedItems.length === 0) {
      return;
    }
    if (!data && !file) {
      return
    }
    setOpenSubmit(true);
  }, [
    typeSelect.selectedItems,
    actionSelect.selectedItems,
    locationSelect.selectedItems,
    file,
  ]);

  const handleSubmit = () => {
    setLoading(true);
    uploadService({
      id: data ? data.id : null,
      file,
      type: typeSelect.getSelectedIds(),
      actions: actionSelect.getSelectedIds(),
      location: locationSelect.getSelectedIds(),
      description: descInput.value,
      datetime,
      successCallback: () => {
        setFile(null);
        typeSelect.setSelectedItems([]);
        actionSelect.setSelectedItems([]);
        locationSelect.setSelectedItems([]);
        refreshPhotos();
        setLoading(false);
      },
      failCallback: () => {
        setLoading(false);
      },
    });
  };

  const handleDelete = (id) => {
    const confirmAction = () => {
      if (window.confirm("Do you really want to delete this photo?")) {
        setLoading(true);
        deleteResources({
          id,
          resource: "photos",
          successCallback: () => {
            refreshPhotos;
            setLoading(false);
          },
          failCallback: () => {
            setLoading(false);
          },
        });
      }
    };
    confirmAction();
  };

  const onDatetimeChange = (date, dateString) => {
    setDatetime(dateString)
  }

  const dateFormat = 'YYYY-MM-DD';

  return (
    <Container>
      <Selects>
        <Select {...typeSelect} multipleChoices={false} />
        <Select {...actionSelect} />
        <Select {...locationSelect} multipleChoices={false} />
        <DatePicker onChange={onDatetimeChange} defaultValue={data && moment(data.create_datetime, dateFormat)} />
      </Selects>
      <SubContainer>
        {data ? (
          <Image
            src={`https://drive.google.com/thumbnail?id=${data.image_id}`}
            alt={data.name}
          />
        ) : (
          <InputFile file={file} setFile={setFile} />
        )}
        <Input {...descInput} errMsg={descInputErr.msg} />
        <ButtonWrap>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Button
                text={data ? "Edit" : "Submit"}
                onClick={handleSubmit}
                disabled={!openSubmit}
              />
              {data && (
                <Button text={"Delete"} onClick={() => handleDelete(data.id)} />
              )}
            </>
          )}
        </ButtonWrap>
      </SubContainer>
    </Container>
  );
};

export default PhotoForm;
