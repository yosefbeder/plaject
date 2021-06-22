import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../UI/Modal';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import {
  XLg,
  X,
  CardHeading,
  JustifyLeft,
  ListCheck,
  PlusLg,
} from 'react-bootstrap-icons';
import Input from '../../UI/Input';
import Button from '../../UI/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { appActions } from '../../store/app-slice';
import { useParams } from 'react-router-dom';

import ReactMde from 'react-mde';
import MDEditor from '@uiw/react-md-editor';
import 'react-mde/lib/styles/css/react-mde-all.css';

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
`;

const Checklist = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 1rem;

  li {
    display: flex;
    align-items: center;
    padding: 0.1rem;
    border: var(--border-thin);
    border-radius: 5px;
  }

  li input {
    flex: 1;
  }
`;

const NewCheckbox = styled(Button)`
  width: calc(100% - 2rem);
  margin: 1rem;
`;

const MarkdownContainer = styled.div`
  margin: 1rem;
`;

const CardDetails: React.FC<{
  showIn: boolean;
  onClose: () => void;
}> = ({ showIn, onClose }) => {
  const { cardId } = useParams<{ cardId: string }>();
  const [id, setId] = useState(cardId);

  useEffect(() => {
    if (!cardId)
      setTimeout(() => {
        setId(cardId);
      }, 300);
    if (cardId) setId(cardId);
  }, [cardId]);

  const dispatch = useAppDispatch();
  const title = useAppSelector(
    state => state.app.projectData!.cards[id]?.title,
  );
  const description = useAppSelector(
    state => state.app.projectData!.cards[id]?.description,
  );
  const [selectedTab, setSelectedTab] = useState<'write' | 'preview'>('write');
  const checklist = useAppSelector(
    state => state.app.projectData!.cards[id]?.checklist,
  );

  return (
    <Modal showIn={showIn} width={600} onClickAway={onClose}>
      <IconButton
        style={{ position: 'absolute', top: 0, right: 0 }}
        onClick={onClose}
      >
        <X size={32} />
      </IconButton>
      <Header>
        <CardHeading size={32} />
        <Input
          variant="h2"
          value={title || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.value.length < 26)
              dispatch(appActions.setCardTitle({ id, value: e.target.value }));
          }}
          placeholder="Untitled"
        />
      </Header>
      <Header>
        <JustifyLeft size={32} />
        <h2>Description</h2>
      </Header>
      <MarkdownContainer>
        <ReactMde
          value={description}
          onChange={value =>
            dispatch(appActions.setCardDescription({ id, value }))
          }
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          generateMarkdownPreview={markdown =>
            Promise.resolve(<MDEditor.Markdown source={markdown} />)
          }
        />
      </MarkdownContainer>

      <Header>
        <ListCheck size={32} />
        <h2>Checklist</h2>
      </Header>
      <Checklist>
        {checklist?.map(({ id: checkboxId, isChecked, content }) => (
          <li key={checkboxId}>
            <Checkbox
              color="default"
              checked={isChecked}
              onClick={() =>
                dispatch(appActions.toggleCheckbox({ checkboxId, cardId: id }))
              }
            />
            <Input
              variant="text"
              placeholder="Untitled"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                dispatch(
                  appActions.setCheckboxValue({
                    checkboxId,
                    cardId: id,
                    value: e.target.value as string,
                  }),
                )
              }
            />
            <IconButton
              onClick={() =>
                dispatch(appActions.deleteCheckbox({ checkboxId, cardId: id }))
              }
            >
              <XLg size={17} />
            </IconButton>
          </li>
        ))}
      </Checklist>
      <NewCheckbox
        variant="outlined"
        IconLabel={PlusLg}
        fullWidth
        className="btn"
        onClick={() => dispatch(appActions.addCheckbox(id))}
      >
        Add a new Todo
      </NewCheckbox>
    </Modal>
  );
};

export default CardDetails;
