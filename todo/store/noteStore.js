import Store from './Store'
import Note from '../models/Note'

/**
 * NoteStore 类
 */
class NoteStore extends Store {
  constructor() {
    super()
    this.notes = []
    this.key = '__notes__'
    this.__init()
  }

  /**
   * 初始化
   */
  __init() {
    // wx.setStorageSync('__notes_inited__', false)
    let isInited = wx.getStorageSync('__notes_inited__')
    if (isInited) return
    this.notes = this.notes.concat([new Note({
      title: '欢迎使用日迹注释功能',
      content: '对于您今天的一切，有何感想呢？'
    }), new Note({
      title: '如何新建注释？',
      content: '点击下方 + 按钮，输入标题和内容后点击保存即可。'
    }), new Note({
      title: '如何编辑注释？',
      content: '点击注释卡片即可进入编辑页面编辑您的注释'
    }), new Note({
      title: '明天好好学习。',
      content: '今天和饮料批发打了一天大乱斗，明天我要好好学导论。'
    })])
    this.save()
    wx.setStorageSync('__notes_inited__', true)
  }

  /**
   * 获取笔记列表
   */
  getNotes() {
    this.read()
    return this.notes
  }

  /**
   * 根据UUID获取笔记
   */
  getNote(uuid) {
    this.read()
    return this.notes.find((item) => item.uuid === uuid)
  }

  /**
   * 根据索引获取笔记
   */
  getNoteByIndex( index ) {
    return this.notes[index]
  }

  /**
   * 获取笔记索引
   */
  getIndex (note) {
    return this.notes.indexOf(note)
  }

  /**
   * 设置笔记列表
   */
  setNotes(notes) {
    this.notes = notes
    this.save()
  }

  /**
   * 添加笔记
   */
  addNote(note) {
    this.notes.push(note)
  }

  /**
   * 编辑笔记
   */
  editNote(uuid, newNote) {
    let note = this.getNote(uuid)
    if (note) Object.assign(note, newNote)
  }

  /**
   * 删除笔记
   */
  removeNote(uuid) {
    let note = this.getNote(uuid)
    let index = this.getIndex(note)
    if (index < 0) return false
    return this.removeNoteByIndex(index)
  }

  /**
   * 根据索引删除笔记
   */
  removeNoteByIndex(index) {
    this.notes.splice(index, 1)
    return true
  }

  /**
   * 读取
   */
  read() {
    let notes = wx.getStorageSync(this.key) || []
    this.notes = notes
  }

  /**
   * 保存
   */
  save() {
    wx.setStorageSync(this.key, this.notes)
  }
}

export default new NoteStore()