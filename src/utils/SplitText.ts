// Custom SplitText implementation (free alternative to GSAP SplitText)
// Splits text into chars, words, and lines for animation

export interface SplitTextResult {
  chars: HTMLElement[]
  words: HTMLElement[]
  lines: HTMLElement[]
  revert: () => void
}

export interface SplitTextOptions {
  type?: string // 'chars' | 'words' | 'lines' or combinations like 'chars, words'
  charsClass?: string
  wordsClass?: string
  linesClass?: string
}

export class SplitText {
  private element!: HTMLElement
  private originalHTML: string = ''
  public chars: HTMLElement[] = []
  public words: HTMLElement[] = []
  public lines: HTMLElement[] = []

  constructor(element: Element | HTMLElement | string | null, options: SplitTextOptions = {}) {
    const el = typeof element === 'string' 
      ? document.querySelector(element) as HTMLElement 
      : element as HTMLElement
    
    if (!el) {
      console.warn('SplitText: Element not found')
      return
    }
    
    this.element = el
    this.originalHTML = this.element.innerHTML
    
    const types = (options.type || 'chars, words, lines').toLowerCase()
    const splitChars = types.includes('char')
    const splitWords = types.includes('word')
    const splitLines = types.includes('line')

    this.split(splitChars, splitWords, splitLines, options)
  }

  private split(
    splitChars: boolean, 
    splitWords: boolean, 
    splitLines: boolean,
    options: SplitTextOptions
  ) {
    const text = this.element.textContent || ''
    const wordsArray = text.split(/\s+/)
    
    // Clear element
    this.element.innerHTML = ''
    
    // Create word spans
    wordsArray.forEach((word, wordIndex) => {
      if (!word) return
      
      const wordSpan = document.createElement('span')
      wordSpan.className = options.wordsClass || 'word'
      wordSpan.style.display = 'inline-block'
      wordSpan.style.whiteSpace = 'nowrap'
      
      if (splitChars) {
        // Split word into characters
        word.split('').forEach((char) => {
          const charSpan = document.createElement('span')
          charSpan.className = options.charsClass || 'char'
          charSpan.style.display = 'inline-block'
          charSpan.textContent = char
          // Fix for space-like characters
          if (char === ' ') {
            charSpan.innerHTML = '&nbsp;'
          }
          wordSpan.appendChild(charSpan)
          this.chars.push(charSpan)
        })
      } else {
        wordSpan.textContent = word
      }
      
      this.words.push(wordSpan)
      this.element.appendChild(wordSpan)
      
      // Add space between words (except last)
      if (wordIndex < wordsArray.length - 1) {
        const space = document.createTextNode(' ')
        this.element.appendChild(space)
      }
    })

    // Handle lines (wrap detection)
    if (splitLines) {
      this.wrapLines(options.linesClass)
    }
  }

  private wrapLines(linesClass?: string) {
    const words = Array.from(this.element.querySelectorAll('.word')) as HTMLElement[]
    if (words.length === 0) return

    let currentLine: HTMLElement[] = []
    let lastTop = words[0]?.getBoundingClientRect().top

    const wrapLine = (lineWords: HTMLElement[]) => {
      if (lineWords.length === 0) return
      
      const lineSpan = document.createElement('span')
      lineSpan.className = linesClass || 'line'
      lineSpan.style.display = 'block'
      lineSpan.style.overflow = 'hidden'
      
      // Insert before first word of line
      lineWords[0].parentNode?.insertBefore(lineSpan, lineWords[0])
      
      // Move words into line span
      lineWords.forEach(word => {
        lineSpan.appendChild(word)
        // Re-add space
        const space = document.createTextNode(' ')
        lineSpan.appendChild(space)
      })
      
      this.lines.push(lineSpan)
    }

    words.forEach((word, i) => {
      const rect = word.getBoundingClientRect()
      
      if (rect.top !== lastTop && currentLine.length > 0) {
        // New line detected
        wrapLine(currentLine)
        currentLine = []
        lastTop = rect.top
      }
      
      currentLine.push(word)
      
      // Last word
      if (i === words.length - 1) {
        wrapLine(currentLine)
      }
    })
  }

  revert() {
    if (this.element) {
      this.element.innerHTML = this.originalHTML
    }
  }
}

export default SplitText
