import { Slot, VNode, Comment } from 'vue';

export function hasSlotContent (slot: Slot | undefined, slotProps = {}): boolean {
  if (slot == null) return false;

  return slot(slotProps).some((vnode: VNode) => {
    if (vnode.type === Comment) return false;

    if (Array.isArray(vnode.children) && (vnode.children.length === 0)) return false;

    return (
      vnode.type !== Text ||
        (typeof vnode.children === 'string' && vnode.children.trim() !== '')
    );
  });
}

export enum Action {
  Enable = 'enable',
  Install = 'install',
  Update = 'update',
}

export enum Module {
  PsAccounts = 'ps_accounts',
}
