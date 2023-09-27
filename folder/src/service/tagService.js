import request from '../utils/request';

// POST /api/v3/{context}/tags/unTagging
const unTag = (tagIds, taggedIds, taggingClass) =>
  request('tags/unTagging').post(
    {
      tagIds,
      taggedIds,
      taggingClass,
    },
    {
      message: {
        success: `برچسب‌ ${taggedIds.length > 1 ? 'ها' : ''} حذف گردید`,
        error: 'خطای حذف برچسب',
      },
    },
  );

export default {
  unTag,
};
