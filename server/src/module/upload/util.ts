interface FileType {
  [key: string]: string[];
}

export const MaxSize = 4 * 1000 * 1000;

export const fileType = {
  image: ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'],
  video: ['mp4', 'webm'],
  audio: ['mp3', 'wav', 'ogg'],
  document: ['pdf', 'docs', 'md', 'doc', 'txt', 'ppt', 'markdown'],
};

const convertToRegExp = (fileType: FileType) => {
  let reg = '.(';
  const arr = Object.keys(fileType);
  for (let i = 0; i < arr.length; i++) {
    reg += fileType[arr[i]].join('|');
    if (i !== arr.length - 1) {
      reg += '|';
    }
  }
  reg += ')$';
  return new RegExp(reg, 'i');
};

export const fileTypeRegExp = convertToRegExp(fileType);
