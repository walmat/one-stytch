import type { DropzoneOptions } from 'react-dropzone'

export type DropZoneOptionsCustom = Omit<DropzoneOptions, 'accept'> & {
  // native only
  onOpen: DropzoneOptions['onDrop']
  // native only
  allowsEditing?: boolean
  mediaTypes?: MediaTypeOptions[]
}
