/**
 * Copyright 2022 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Story, Meta } from '@storybook/react';
import MobileNavigation, { MobileNavigationProps } from './mobile-navigation';

export default {
  component: MobileNavigation,
  title: 'MobileNavigation',
} as Meta;

const Template: Story<MobileNavigationProps> = (args) => <MobileNavigation {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
