import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] py-12 px-4 text-center bg-red-50 dark:bg-red-900 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-red-700 dark:text-red-300 mb-4">حدث خطأ ما!</h1>
          <p className="text-xl text-red-600 dark:text-red-200 mb-6">
            عذراً، واجهنا مشكلة غير متوقعة.
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            الرجاء المحاولة مرة أخرى أو التواصل مع الدعم الفني إذا استمرت المشكلة.
          </p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 p-4 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 rounded text-left w-full max-w-md overflow-auto">
              <summary className="font-bold">تفاصيل الخطأ (للمطورين)</summary>
              <pre className="whitespace-pre-wrap break-words">{this.state.error.toString()}</pre>
              <pre className="whitespace-pre-wrap break-words">{this.state.errorInfo.componentStack}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;