# MNIST Digit Classifier – Custom CNN with <13K Parameters

A compact and efficient convolutional neural network (CNN) built in PyTorch to classify handwritten digits from the MNIST dataset, achieving 99.40% accuracy with just 12,400 trainable parameters.

## 🎯 Problem Statement
Built a highly efficient CNN to solve the classic MNIST digit classification problem with a unique constraint: achieving high accuracy while keeping the model size extremely small (<13K parameters). This demonstrates the ability to create production-ready models that can run efficiently on resource-constrained devices.

## 💡 Why This Matters
- **Resource Efficiency**: Most MNIST solutions use large models with millions of parameters
- **Production Readiness**: Small models are crucial for edge devices and mobile applications
- **Cost Effectiveness**: Reduced model size means lower deployment and inference costs
- **Learning Opportunity**: Demonstrates understanding of CNN architecture optimization

## 📌 Overview
This project demonstrates how to build a lightweight and highly efficient CNN from scratch using PyTorch. The model is trained to recognize digits (0–9) from the MNIST dataset and is optimized for minimal parameter usage while maintaining high accuracy. The architecture follows modern CNN design principles while keeping the model size extremely small.

## 🎯 Goals
- Design a CNN with <13K parameters
- Use batch normalization, dropout, and 1x1 convolutions
- Eliminate fully connected layers using global average pooling
- Achieve high classification accuracy on MNIST with minimal computation
- Demonstrate efficient use of modern CNN techniques

## 💪 Project Implementation & Impact
1. **Architecture Design**
   - Designed a custom CNN architecture from scratch
   - Implemented efficient layer combinations
   - Used modern techniques like Global Average Pooling

2. **Code Implementation**
   - Wrote the complete model in PyTorch
   - Implemented custom training loop
   - Added proper logging and progress tracking

3. **Optimization**
   - Tuned hyperparameters for optimal performance
   - Implemented batch normalization and dropout
   - Optimized learning rate and momentum

4. **Documentation**
   - Created comprehensive README
   - Added detailed code comments
   - Documented architectural decisions

## 🛠 Tech Stack & Tools
- **Core Framework**: PyTorch
- **Data Processing**: torchvision
- **Model Analysis**: torchsummary
- **Development**: Jupyter Notebook
- **Version Control**: Git
- **Environment**: Python 3.x
- **Hardware**: GPU-accelerated training

## 🧱 Model Architecture

### Input
- 28x28 grayscale images
- Normalized using mean=0.1307, std=0.3081
- Batch size: 128

### Network Structure
1. **Initial Convolution Block**
   - Conv2d(1, 16, 3, bias=False) → ReLU → BatchNorm2d(16) → Dropout2d(0.09)
   - Output: 26x26x16
   - Parameters: 144 (16 * 3 * 3)

2. **Feature Extraction Block**
   - Conv2d(16, 32, 3, bias=False) → ReLU → BatchNorm2d(32) → Dropout2d(0.09)
   - Output: 24x24x32
   - Parameters: 4,608 (32 * 16 * 3 * 3)

3. **Channel Reduction**
   - Conv2d(32, 8, 1, bias=False) → MaxPool2d(2,2)
   - Output: 12x12x8
   - Parameters: 256 (8 * 32 * 1 * 1)

4. **Deep Feature Learning**
   - Conv2d(8, 16, 3, bias=False) → ReLU → BatchNorm2d(16) → Dropout2d(0.09)
   - Output: 10x10x16
   - Parameters: 1,152 (16 * 8 * 3 * 3)

5. **Feature Refinement**
   - Conv2d(16, 16, 3, bias=False) → ReLU → BatchNorm2d(16) → Dropout2d(0.09)
   - Output: 8x8x16
   - Parameters: 2,304 (16 * 16 * 3 * 3)

6. **Spatial Feature Learning**
   - Conv2d(16, 16, 3, padding=1, bias=False) → ReLU → BatchNorm2d(16) → Dropout2d(0.09)
   - Output: 8x8x16
   - Parameters: 2,304 (16 * 16 * 3 * 3)

7. **Final Classification**
   - Conv2d(16, 10, 3, bias=False) → Global Average Pooling → LogSoftmax
   - Output: 10 classes
   - Parameters: 1,440 (10 * 16 * 3 * 3)

### Key Features
- No fully connected layers
- Global Average Pooling for parameter reduction
- Batch Normalization for stable training
- Dropout for regularization (0.09 dropout rate)
- 1x1 convolution for channel reduction
- Bias-free convolutions for parameter efficiency
- Single max pooling layer for spatial reduction

### Architectural Decisions
1. **MaxPooling Usage**
   - Used to reduce channel dimensions
   - Positioned far from the final layer
   - Placed after a block completes its work (edges → gradients → textures → patterns → objects)

2. **Batch Normalization**
   - Applied after every layer
   - Never used before the last layer
   - Helps in training stability

3. **Dropout Strategy**
   - Used after every layer
   - Small dropout rate (0.09) for regularization
   - Helps prevent overfitting

4. **Learning Rate**
   - Fixed learning rate of 0.01
   - Used with momentum (0.9)
   - Critical for model convergence

## 🧮 Model Statistics

- **Total Parameters**: 12,400
- **Trainable Parameters**: 12,400
- **Model Size**: ~0.05 MB
- **Forward/Backward Pass Size**: ~1.05 MB
- **Memory Usage**: ~1.10 MB total

### Parameter Distribution
- Convolutional Layers: 12,208 parameters
- Batch Normalization: 192 parameters
- Total: 12,400 parameters

## 🚀 Training Details

### Optimization
- **Optimizer**: SGD with momentum (0.9)
- **Learning Rate**: 0.01 (fixed)
- **Batch Size**: 128
- **Epochs**: 20
- **Loss Function**: Negative Log Likelihood Loss

### Data Processing
- **Dataset**: MNIST (60,000 training, 10,000 testing)
- **Normalization**: (x - 0.1307) / 0.3081
- **Data Loader**: 
  - num_workers: 1
  - pin_memory: True (for GPU)
  - shuffle: True

### Training Process
- Training time: ~14 seconds per epoch on GPU
- Progress tracking with tqdm
- Batch-wise loss monitoring
- Epoch-wise accuracy evaluation

## 📊 Results & Impact
- **Accuracy**: 99.40% on test set
- **Model Size**: 12,400 parameters (0.05 MB)
- **Training Time**: ~14 seconds per epoch
- **Memory Usage**: ~1.10 MB total
- **Convergence**: Achieved within 20 epochs

### Training Progress
- Epoch 1: 97.97% accuracy
- Epoch 5: 99.08% accuracy
- Epoch 10: 99.30% accuracy
- Epoch 15: 99.36% accuracy
- Epoch 20: 99.40% accuracy

## 🏆 Key Achievements
1. **Parameter Efficiency**
   - Achieved high accuracy with minimal parameters
   - Demonstrated effectiveness of 1x1 convolutions
   - Showed power of Global Average Pooling

2. **Architecture Innovation**
   - Eliminated fully connected layers
   - Used bias-free convolutions
   - Implemented strategic max pooling

3. **Training Optimization**
   - Stable training with batch normalization
   - Effective regularization with dropout
   - Fast convergence with proper learning rate

## 🧠 Key Learnings

1. **Parameter Efficiency**
   - Achieved high accuracy with minimal parameters
   - Demonstrated effectiveness of 1x1 convolutions
   - Showed power of Global Average Pooling
   - Importance of bias-free convolutions

2. **Architecture Design**
   - Importance of gradual feature extraction
   - Value of skip connections and residual learning
   - Impact of proper regularization
   - Effectiveness of channel reduction

3. **Training Optimization**
   - Role of batch normalization in training stability
   - Effectiveness of dropout in preventing overfitting
   - Importance of learning rate and momentum tuning
   - Value of proper data normalization

## 🧩 Future Improvements

1. **Model Enhancements**
   - Add residual connections
   - Experiment with different activation functions
   - Try learning rate scheduling
   - Implement attention mechanisms

2. **Training Improvements**
   - Implement data augmentation
   - Add learning rate finder
   - Use cosine annealing scheduler
   - Try different optimizers (Adam, RMSprop)

3. **Deployment**
   - Create a web interface for real-time predictions
   - Add model quantization for edge deployment
   - Implement model pruning for further size reduction
   - Add ONNX export support

## 🚀 How to Run

1. **Quick Start (Colab)**
   [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yourusername/mnist-cnn)

2. **Local Setup**
```bash
# Install dependencies
pip install torch torchvision torchsummary tqdm

# Run training
python train.py

# Test model
python test.py
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. Areas for contribution include:
- Model architecture improvements
- Training optimization
- Documentation
- Testing and validation
- Deployment solutions

## 📋 Project Summary

Designed and implemented a highly efficient Convolutional Neural Network (CNN) in PyTorch that achieves 99.40% accuracy on the MNIST digit classification task while maintaining an extremely compact architecture of just 12,400 parameters. The model incorporates modern deep learning techniques including batch normalization, dropout, and global average pooling, eliminating the need for fully connected layers. Through strategic architectural decisions and optimization techniques, the solution demonstrates the ability to create production-ready models that can run efficiently on resource-constrained devices. The implementation showcases expertise in neural network design, PyTorch development, and model optimization, with comprehensive documentation and reproducible results.





