import { useEffect, useState } from 'react';

const client = async () => import('../client');

let cacheStore = null;

if (typeof window !== 'undefined') {
  client().then(module => {
    cacheStore = module.store;
  });
}

const hasAclCodeInStore = aclCode =>
  !!cacheStore
    ?.getState()
    ?.acl?.authorities?.find(({ code }) => code === aclCode);

const useAclPermission = aclCode => {
  const [hasAccess, setHasAccess] = useState(hasAclCodeInStore(aclCode));

  useEffect(() => {
    if (!hasAccess) {
      client().then(module => {
        cacheStore = module.store;
        setHasAccess(hasAclCodeInStore(aclCode));
      });
    }
  }, []);

  return hasAccess;
};

export default useAclPermission;
