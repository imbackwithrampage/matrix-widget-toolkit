/*
 * Copyright 2022 Nordeck IT + Consulting GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ModalButtonKind } from '@beeper/matrix-widget-api';
import { useWidgetApi } from '@beeper/matrix-widget-toolkit-react';
import { ReactElement, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Icon, Segment } from 'semantic-ui-react';
import {
  ModalButtonNo,
  ModalButtonYes,
  ModalButtonYesTotally,
  ModalInputData,
  ModalResult,
} from './ModalDialog';

/**
 * A component that opens a modal via the widget API and waits for the response.
 */
export const ModalPage = (): ReactElement => {
  const widgetApi = useWidgetApi();
  const [modalResult, setModalResult] = useState<string | undefined>();

  const handleOpenModal = useCallback(async () => {
    setModalResult(undefined);

    const data = await widgetApi.openModal<ModalResult, ModalInputData>(
      '/modal/dialog',
      'How do you feel?',
      {
        buttons: [
          {
            id: ModalButtonYes,
            kind: ModalButtonKind.Primary,
            label: 'Yes!',
            disabled: true,
          },
          {
            id: ModalButtonYesTotally,
            kind: ModalButtonKind.Danger,
            label: 'Totally Yes!',
            disabled: true,
          },
          {
            id: ModalButtonNo,
            kind: ModalButtonKind.Secondary,
            label: 'No!',
            disabled: true,
          },
        ],
        data: { title: 'This is a custom title!' },
      }
    );

    if (!data) {
      setModalResult('No answer :-(');
    } else {
      setModalResult(data.result);
    }
  }, [widgetApi]);

  return (
    <Container>
      <Button icon labelPosition="left" as={Link} to="/">
        <Icon name="arrow alternate circle left outline" />
        Back to navigation
      </Button>

      <Divider />

      <Segment attached>Example for modals</Segment>
      <Button onClick={handleOpenModal} primary attached="bottom">
        Open Modal
      </Button>

      {modalResult && <Segment>Result: {modalResult}</Segment>}
    </Container>
  );
};
