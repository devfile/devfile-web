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

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (!req.query.secret) {
    return res.status(400).send('Missing token');
  }

  if (typeof req.query.secret !== 'string') {
    return res.status(400).send('Invalid token');
  }

  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Tokens do not match' });
  }

  if (!req.query.path) {
    return res.status(400).send('Missing path');
  }

  if (typeof req.query.path !== 'string') {
    return res.status(400).send('Invalid path');
  }

  try {
    await res.revalidate(req.query.path);
    return res.json({
      revalidated: true,
    });
  } catch {
    return res.status(500).send('Error revalidating');
  }
}
